import OfficeAddress from "@/Layout/Footer/OfficeAddress";
import React from "react";

const Map = () => {
  return (
    <div className="flex flex-col">
      <div className="w-full h-[300px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.0430338865763!2d77.1991304!3d28.5384262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3959c2abc41%3A0x7307d03924664e13!2sHeadsup%20B2B!5e0!3m2!1sen!2sin!4v1739445606709!5m2!1sen!2sin"
          className="w-full h-full rounded-xl"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Headsup B2B Location"
        />
        
      </div>

      <div className="mt-[-25px]">
        <OfficeAddress />
      </div>
    </div>
  );
};

export default Map;
