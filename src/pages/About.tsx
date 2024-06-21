import React from "react";
import SinglePage from "src/components/ui/layout/SinglePage";
import { Button } from "src/components/ui/button";

const About = () => {
    return (
        <SinglePage isLast>
            <div className="flex p-2 justify-between font-semibold">
                <h1>
                    Author: <span className="font-normal">KhanZa</span>
                </h1>
                <Button
                    variant={"ghost"}
                    className="h-fit w-fit "
                    onClick={() => {
                        window.location.href =
                            "https://github.com/Ho-Gia-Khang/SimpleMoneyNote";
                    }}
                >
                    <img
                        src="./GitHub_logo.png"
                        alt="Github-logo"
                        height={64}
                        width={64}
                    />
                </Button>
            </div>
        </SinglePage>
    );
};

export default About;
