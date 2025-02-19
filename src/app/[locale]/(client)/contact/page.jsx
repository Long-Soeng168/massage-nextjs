// pages/contact.js
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { getContact } from "@/services/page-services";
import { getTranslations } from "next-intl/server";
import ScrollToTop from "@/components/scroll-to-top";
import ContactForm from "@/components/contact-form";

export async function generateMetadata() {
  let contact = await getContact();
  return {
    title: 'Contact Us',
    description: contact.description,
    openGraph: {
      title: 'Contact Us',
      description: contact.description,
    },
  };
}

const ContactPage = async () => {
  let contact = await getContact();
  const t = await getTranslations("Index");
  return (
    <div className="grid gap-12 my-8 lg:grid-cols-2">
      <ScrollToTop />

      {/* Company Contact Information */}
      <div className="rounded-lg">
        <h2 className="mb-4 text-3xl font-semibold text-pri">
          {t("contactInformation")}
        </h2>
        <div className="mb-4">
          {contact?.description && (
            <div
              className="w-full prose max-w-none lg:prose-xl"
              dangerouslySetInnerHTML={{ __html: contact?.description }}
            />
          )}
        </div>

        <div className="space-y-4 ">
          <div className="flex items-center space-x-4">
            <Mail className="w-6 h-6 text-gray-500 dark:text-gray-200" />
            <p className="text-gray-500 dark:text-gray-200">{contact?.email}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Phone className="w-6 h-6 text-gray-500 dark:text-gray-200" />
            <p className="text-gray-500 dark:text-gray-200">{contact?.phone}</p>
          </div>
          <div className="flex items-center space-x-4">
            <MapPin className="w-6 h-6 text-gray-500 dark:text-gray-200" />
            <p className="text-gray-500 dark:text-gray-200">
              {contact?.address}
            </p>
          </div>
        </div>

        {/* Google Maps Iframe */}
        <div className="mt-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
            {t("ourLocation")}
          </h3>
          <div className="h-64 overflow-hidden rounded-lg ">
            <iframe
              className="w-full h-full"
              src={contact?.map}
              allowFullScreen=""
              loading="lazy"
              title="Google Maps Location"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="p-8 border rounded-lg shadow-md bg-background">
        <h2 className="mb-4 text-3xl font-semibold text-center text-gray-800 dark:text-white">
          {t("sendUsAMessage")}
        </h2>

        <ContactForm />
      </div>
    </div>
  );
};

export default ContactPage;
