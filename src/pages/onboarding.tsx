/* eslint-disable react/no-unescaped-entities */
import React, { ReactElement, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useUserStore } from "../store/UserStore";
import { useClassroomStore } from "../store/ClassroomStore";
import { UserRole } from "../models/User";
import { useRouter } from "next/router";
import Image from "next/image";
import beaver1 from "@images/beaver1.svg";
import beaver2 from "@images/beaver2.svg";
import beaver3 from "@images/beaver3.svg";
import beaver4 from "@images/beaver4.svg";
import borrisProfile from "@images/borrisProfile.svg";
import tempVideoIcon from "@images/tempVideoIcon.svg";
import impactsOnAnimalsIcon from "@images/impactsOnAnimalsIcon.svg";
import seaLevelsVideoIcon from "@images/seaLevelsVideoIcon.svg";
import weatherChangesVideoIcon from "@images/weatherChangesVideoIcon.svg";
import fakeVideo from "@images/fakeVideo.svg";

import { Button, Tooltip } from "@chakra-ui/react";

export enum Step {
  INTRO,
  CHOOSE_TOPIC,
  WATCH_VIDEO,
  START,
}

const OnboardingPage = () => {
  const { user } = useUserStore();
  const { classroom } = useClassroomStore();
  const [step, setStep] = useState(Step.INTRO);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      return;
    }

    if (user.role === UserRole.TEACHER) {
      router.push("/class-page");
    }
  }, [router, user]);

  const getBeaver = () => {
    switch (step) {
      case Step.INTRO:
        return beaver1;
      case Step.CHOOSE_TOPIC:
        return beaver2;
      case Step.WATCH_VIDEO:
        return beaver3;
      case Step.START:
        return beaver4;
    }
  };

  const getMessage = () => {
    switch (step) {
      case Step.INTRO:
        return "This is my home! It's currently in danger because of climate change! Will you help me preserve it by learning more?";
      case Step.CHOOSE_TOPIC:
        return "Thanks for your help! Click on a topic you want to learn more about to get started!";
      case Step.WATCH_VIDEO:
        return "Great choice! Watch this video to learn more about the topic!";
      case Step.START:
        return "Now that you've learned more about the topic, let's get started!";
    }
  };

  return (
    <div>
      {(step === Step.INTRO || step === Step.START) && (
        <Image
          className="absolute bottom-40 xl:left-40"
          src={getBeaver()}
          alt="Borris The Beaver"
        />
      )}
      {step !== Step.INTRO && (
        <Image
          className="absolute bottom-40 xl:left-40 hidden md:block"
          src={getBeaver()}
          alt="Borris The Beaver"
        />
      )}
      <div className="w-full max-w-5xl absolute bottom-20 xl:left-60 px-10">
        <div className="flex items-start">
          <div className="rounded-full aspect-square border-2 border-black z-20">
            <Image
              src={borrisProfile}
              alt="Borris The Beaver"
              style={{ objectFit: "cover" }}
              className="bg-slate-200 rounded-full w-40"
            />
          </div>
          <div>
            <div className="bg-slate-200 w-fit min-h-fit flex items-center z-30 rounded-lg border-2 border-black -mb-1 -ml-4 px-3">
              <p className="font-bold text-lg">Borris</p>
            </div>
            <div className="bg-slate-200 w-full min-h-fit flex items-center z-10 pl-10 -ml-7 rounded-xl border-2 border-black py-2">
              <p className="font-bold text-lg">{getMessage()}</p>
            </div>
            {step !== Step.CHOOSE_TOPIC && (
              <div className="flex justify-center">
                <Button
                  className="mt-4"
                  onClick={() =>
                    step === Step.START
                      ? router.push("/your-page")
                      : setStep(step + 1)
                  }
                >
                  {step === Step.INTRO && "Let's Go!"}
                  {step === Step.START && "Start Tracking Habits"}
                  {step === Step.WATCH_VIDEO && "Done Watching"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {(step === Step.CHOOSE_TOPIC || step === Step.WATCH_VIDEO) && (
        <div className="flex justify-end md:mr-20 mx-10">
          <div className="w-full max-w-4xl rounded-xl md:mr-20 mt-20 p-4 mx-auto">
            {step === Step.CHOOSE_TOPIC && (
              <div className="grid grid-cols-2 gap-y-10 gap-x-4">
                <div
                  className="flex justify-center items-center flex-col"
                  onClick={() => setStep(step + 1)}
                >
                  <Image
                    src={tempVideoIcon}
                    alt="Video Icon"
                    className="rounded-xl cursor-pointer hover:scale-105 transition-all"
                  />
                  <p className="font-bold text-lg text-center mt-2">
                    Changing Temperatures
                  </p>
                </div>
                <div
                  className="flex justify-center items-center flex-col"
                  onClick={() => setStep(step + 1)}
                >
                  <Image
                    src={seaLevelsVideoIcon}
                    alt="Video Icon"
                    className="rounded-xl cursor-pointer hover:scale-105 transition-all"
                  />
                  <p className="font-bold text-lg text-center mt-2">
                    Rising Sea Levels
                  </p>
                </div>
                <div
                  className="flex justify-center items-center flex-col"
                  onClick={() => setStep(step + 1)}
                >
                  <Image
                    src={weatherChangesVideoIcon}
                    alt="Video Icon"
                    className="rounded-xl cursor-pointer hover:scale-105 transition-all"
                  />
                  <p className="font-bold text-lg text-center mt-2">
                    Weather Changes
                  </p>
                </div>
                <div
                  className="flex justify-center items-center flex-col"
                  onClick={() => setStep(step + 1)}
                >
                  <Image
                    src={impactsOnAnimalsIcon}
                    alt="Video Icon"
                    className="rounded-xl cursor-pointer hover:scale-105 transition-all"
                  />
                  <p className="font-bold text-lg text-center mt-2">
                    Impacts on Animals
                  </p>
                </div>
              </div>
            )}
            {step === Step.WATCH_VIDEO && (
              <div className="flex justify-center items-center flex-col">
                <Tooltip label="Video will not play in this proof of concept">
                  <Image
                    src={fakeVideo}
                    alt="Fake video"
                    className="rounded-xl cursor-pointer"
                  />
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OnboardingPage;

OnboardingPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout noNav>{page}</Layout>;
};
