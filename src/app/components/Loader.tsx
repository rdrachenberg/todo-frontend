import React from "react";
import { LoaderProps } from "../types";

const Loader: React.FC<LoaderProps> = ({ loading, size = 20, color = "#FFFFFF" }) => {
    return (
        <>
            {loading && (
                <div className="flex flex-col justify-center items-center">
                    <div
                        className="animate-spin inline-block rounded-full border-t-transparent border-solid"
                        style={{
                            width: size,
                            height: size,
                            borderWidth: size / 6,
                            borderColor: `${color} transparent transparent transparent`,
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default Loader;
