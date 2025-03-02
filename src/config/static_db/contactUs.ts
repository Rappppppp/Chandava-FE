import { icons } from "lucide-react";

export const contactUs: {
  mapLink: string;
  socials: { name: string; icon: keyof typeof icons; description: string }[];
} = {
  mapLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3866.7239749108317!2d121.55730017514595!3d14.269313086178714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ffb21d963f8b%3A0xd8a7e8595b5106c3!2sChandava%20Lakeside%20Resort!5e0!3m2!1sen!2sph!4v1740902202176!5m2!1sen!2sph",

  socials: [
    { name: "Location", icon: "MapPin", description: "Chandava Lakeside Resort" },
    { name: "Facebook Page", icon: "Facebook", description: "Chandava Lake Resort and Resto" },
    { name: "Phone number", icon: "Phone", description: "0905-132-5384, 0999-421-1013" },
  ],
};
