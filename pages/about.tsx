import React from "react";
import CoreContainer from "../containers/main/CoreContainer";

const AboutPage = () => {
  return (
    <CoreContainer>
      <div className="py-4 px-2">
        <div className="font-black uppercase italic leading-6 flex-1">
          <h2 className="text-7xl">About the project.</h2>
        </div>
        <div className="mt-4">
          <p className="text-lg">
            This is a fan-made project where we aim to draw every single
            operator and create an archive, of sorts. We plan on compiling
            everyone’s art into a digital zine which will be available as a
            pay-what-you want zine and all profits will be donated to a charity
            of later choosing.
          </p>
        </div>
      </div>
    </CoreContainer>
  );
};

export default AboutPage;
