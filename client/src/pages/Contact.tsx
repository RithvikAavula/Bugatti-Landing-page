import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertTestDriveRequestSchema, bugattiModels } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GlassCard } from "@/components/GlassCard";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(insertTestDriveRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      preferredModel: "",
      message: "",
    },
  });

  const testDriveMutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("POST", "/api/test-drive-requests", data);
    },
    onSuccess: () => {
      toast({
        title: "Request Submitted",
        description: "Thank you for your interest. Our team will contact you shortly.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: any) => {
    testDriveMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              Get in Touch
            </span>
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-body">
            Schedule a test drive or speak with our specialists about configuring your dream Bugatti
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <GlassCard neonBorder>
            <div className="flex flex-col items-center text-center">
              <Mail className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-display font-bold mb-2">Email</h3>
              <p className="text-sm text-foreground/70">contact@bugatti.com</p>
            </div>
          </GlassCard>

          <GlassCard neonBorder>
            <div className="flex flex-col items-center text-center">
              <Phone className="h-12 w-12 text-cyan-400 mb-4" />
              <h3 className="text-lg font-display font-bold mb-2">Phone</h3>
              <p className="text-sm text-foreground/70">+33 3 88 78 90 00</p>
            </div>
          </GlassCard>

          <GlassCard neonBorder>
            <div className="flex flex-col items-center text-center">
              <MapPin className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-lg font-display font-bold mb-2">Location</h3>
              <p className="text-sm text-foreground/70">Molsheim, France</p>
            </div>
          </GlassCard>
        </div>

        <div className="max-w-2xl mx-auto">
          <GlassCard neonBorder className="p-8">
            <h2 className="text-2xl font-display font-bold mb-6 text-center">
              <span className="bg-gradient-to-r from-primary to-cyan-400 bg-clip-text text-transparent">
                Schedule a Test Drive
              </span>
            </h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} data-testid="input-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john.doe@example.com"
                          {...field}
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} data-testid="input-phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Model</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-model">
                            <SelectValue placeholder="Select a model" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {bugattiModels.map((model) => (
                            <SelectItem key={model.id} value={model.id}>
                              {model.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your preferences and requirements..."
                          className="min-h-[120px]"
                          {...field}
                          data-testid="textarea-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={testDriveMutation.isPending}
                  data-testid="button-submit"
                >
                  {testDriveMutation.isPending ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Submit Request
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
