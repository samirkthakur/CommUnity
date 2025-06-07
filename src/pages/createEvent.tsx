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

      await axios.post(
        `${apiUrl}/api/events`,
        {
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
    <div className="max-w-lg mx-auto p-6 space-y-6 bg-background rounded-xl shadow">
      <h1 className="text-2xl font-bold">Create Event</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
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
                <FormControl>
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
                <FormControl>
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
                <FormControl>
                  <Input placeholder="Event location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Create Event
          </Button>
        </form>
      </Form>
    </div>
  );
}
