"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { toast } from "sonner";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";

import { createEventSchema } from "../lib/validations/event";

type CreateEventFormValues = z.infer<typeof createEventSchema>;

export default function CreateEvent() {
  const form = useForm<CreateEventFormValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      location: "",
    },
  });

  const onSubmit = async (values: CreateEventFormValues) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      const token = user && (await user.getIdToken());

      if (!user) {
        toast.error("You must be logged in to create an event.");
        return;
      }
      const apiUrl = import.meta.env.VITE_API_URL;

      await axios.post(`${apiUrl}/api/events`, {
        ...values,
        createdBy: user.uid,
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      toast.success("Event created!");
      form.reset();
    } catch (err) {
      console.error("Error creating event", err);
      toast.error("Failed to create event.");
    }
  };

  return (
    <div className="space-y-8 mt-10 max-w-lg mx-auto p-6 bg-card rounded-xl shadow">
      <h1 className="text-2xl text-center font-bold">Create Event</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl className="mt-2">
                  <Input placeholder="Event title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl className="mt-2">
                  <Textarea placeholder="Event description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl className="mt-2">
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl className="mt-2">
                  <Input placeholder="Event location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-2">
            Create Event
          </Button>
        </form>
      </Form>
    </div>
  );
}
