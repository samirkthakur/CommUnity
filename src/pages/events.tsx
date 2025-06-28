"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { fetchEvents } from "../api";
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'


import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";

type Event = {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
};

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchEvents();
      setEvents(data);
    };
    getEvents();
  }, []);

  const joinEvent = async (eventId: string) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const token = await user?.getIdToken();
      if (!user) {
        toast.error("You must be logged in to join an event.");
        return;
      }
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.post(`${apiUrl}/api/events/${eventId}/join`, {
          userId: user.uid,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Joined event!");
    } catch (err) {
      toast.error("Failed to join event. Please try again.");
      console.error("Join failed", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-center">Upcoming Events</h1>

      {events.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event._id} className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {event.description}
                </p>
                <p className="text-sm">
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  <strong>Location:</strong> {event.location}
                </p>
              </CardContent>
              <div className="grid sm:grid-cols-2 gap-0">
                <CardFooter>
                  <Button className="w-full" onClick={() => joinEvent(event._id)}>
                    Join
                  </Button>
                </CardFooter>
                <CardFooter>
                  <Button className="w-full" onClick={() => navigate(`/events/${event._id}`)}>
                    View Details
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No events available.</p>
      )}
    </div>
  );
};

export default Events;
