import { FC } from "react";
import Icon from "@components/Icon";
import StaticDB from "@config/static_db/StaticDB";
import Title from "@components/Title";
import Paragraph from "@components/Paragraph";
import ContactUsForm from "@features/landingpage/components/ContactUsForm";

const MapStyle = {
    width: "100%",
    height: "450px",
};

const ContactUs: FC = () => {
    const { contactUs } = StaticDB;
    return (


        <div className="flex flex-col-reverse md:flex-row gap-3 md:gap-5">
            <div className="w-full md:w-1/2 ">
                <div className="w-full relative">
                    <div className="aspect-video w-full bg-primary rounded-4xl overflow-hidden">
                        <iframe
                            src={contactUs.mapLink}
                            width={MapStyle.width}
                            height={MapStyle.height}
                            frameBorder={0} // Use number type
                            style={{ border: 0 }}
                            allowFullScreen
                            aria-hidden="false"
                            tabIndex={0}
                            title="Humanity First Indonesia"
                        />
                    </div>
                    <div className="mt-5 md:mt-10 ">

                        {
                            contactUs.socials.map((social, index) => (
                                <div key={index} className="mb-3 flex items-center gap-3">
                                    <div className="aspect-square w-[3.75rem] bg-primary rounded-full flex justify-center items-center">
                                        <Icon name={social.icon} size={30} color="white"  />
                                    </div>
                                    <div>
                                        <p>{social.name}</p>
                                        <p className="text-xs text-gray-500">
                                            {social.description}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }

                     
                    </div>

                </div>
            </div>

            <div className="w-full md:w-1/2 ">
                <Title title="Contact Us" />
                <Paragraph className="mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, voluptatibus, quis, doloremque, quos, temporibus, dolores, voluptas, aspernatur, repellendus</Paragraph>
                <ContactUsForm />
            </div>

        </div>

    );
};

export default ContactUs;
