"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useAuth } from "../contexts/authContext";

type Event = {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  fundingType: string;
  goalAmount: number;
  currentAmount: number;
  fundingStatus: "open" | "closed";
};

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [amount, setAmount] = useState<string>("");
  const { user } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = await user?.getIdToken();
        const res = await axios.get(`${apiUrl}/api/events/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvent(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch event details");
      }
    };
    if (id) fetchEvent();
  }, [id]);

  const handleContribute = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (!user) {
      toast.error("You must be logged in to contribute");
      return;
    }
    try {
      const token = await user?.getIdToken();
      await axios.post(`${apiUrl}/api/contributions/${id}/contribute`, {
        amount: Number(amount),
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Contribution successful");
      // Refresh event data to update currentAmount
      const res = await axios.get(`${apiUrl}/api/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvent(res.data);
      setAmount("");
    } catch (err) {
      console.error(err);
      toast.error("Contribution failed");
    }
  };

  if (!event) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <Card>
        <CardHeader className="text-center py-5">
          <CardTitle>{event.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{event.description}</p>
          <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
          <p><strong>Location:</strong> {event.location}</p>

          <div className="border-t pt-4">
            <p><strong>Funding Status:</strong> {event.fundingStatus}</p>
            <div className="space-y-2 mt-2"></div>
            <p><strong>Goal:</strong> ${event.goalAmount}</p>
            <div className="space-y-2 mt-2"></div>
            <p><strong>Raised:</strong> ${event.currentAmount}</p>

            {event.fundingStatus === "open" && (
              <div className="space-y-2 mt-6">
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount((e.target.value))}
                />
                <Button onClick={handleContribute}>Contribute</Button>
              </div>
            )}

            {event.fundingStatus === "closed" && (
              <p className="text-muted-foreground mt-4">Funding is closed for this event.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetails;

