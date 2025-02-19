"use client";
import { BASE_API_URL } from "@/config/env";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ContactForm() {
  const t = useTranslations("Index");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [message, setMessage] = useState("");

  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    setIsSubmitting(true);
    setMessage("");

    try {
      // Send data to the API endpoint
      const response = await fetch(
        `${BASE_API_URL}/telegram_message?name=${encodeURIComponent(
          formData.name
        )}&phone=${encodeURIComponent(
          formData.phone
        )}&message=${encodeURIComponent(formData.message)}`,
        {
          method: "GET", // Use GET as per the API endpoint
        }
      );

      if (response.ok) {
        setMessage(
          "Message sent successfully! We will get back to you as soon as possible."
        );
        setIsOpenDialog(true);

        // Clear form inputs
        setFormData({
          name: "",
          phone: "",
          message: "",
        });
      } else {
        setMessage(
          "Failed to send message. Please contact the admin directly."
        );
      }
    } catch (error) {
      setMessage("An error occurred. Please contact the admin directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message sent successfully!</DialogTitle>
            <DialogDescription>
              {t("weWillGetBackToYouAsSoonAsPossible")}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {t("name")}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            placeholder="Name"
            required
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {t("phone")}
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            placeholder="Phone"
            required
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {t("message")}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
            placeholder="Message"
            rows="4"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 transition-all duration-500 rounded-md shadow text-primary-foreground bg-primary hover:scale-105 focus:outline-none"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : t("sendMessage")}
        </button>

        {message && <p className="mt-4 text-sm text-center">{message}</p>}
      </form>
    </>
  );
}
