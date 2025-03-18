// "use client";

// import React from "react";
// import TrueFocus from "./TrueFocus";
// import PlatformContainer from "../PlatFormContainer";
// import RobotContainer from "../RobotContainer";

// const AnimatedHero = () => {
//   return (
//     <div className="relative w-full h-screen overflow-hidden">
//       <div className="relative z-10 grid items-center justify-center h-full grid-cols-1 grid-cols-2 lg:grid-cols-2 max-sm:grid-cols-1">
//         <div className="h-[40%] w-[100%] max-sm:w-[120%] grid grid-cols-1">
//          <div className="w-[100%] h-[100%]">

//          <RobotContainer/>
//          </div>
//           <div className="h-[80%] w-[80%] max-sm:w-[100%] max-sm:h-[100%] flex flex-col items-center p-auto max-sm:mx-[-3vh] justify-center lg:h-full lg:w-full mt-[20vh] z-100">
//           {/* <RobotContainer/> */}
//           <PlatformContainer/>
//           </div>
//         </div>
//         <div className="text-center">
//           <TrueFocus
//             sentence="Welcome to AXIS 25"
//             manualMode={false}
//             blurAmount={7}
//             borderColor="#00FFFF"
//             glowColor="rgba(0, 255, 255, 0.6)"
//           />
//           <p className="max-w-2xl px-4 mx-auto mt-6 text-xl text-gray-300">
//             Experience the future of technology at our premier tech festival
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnimatedHero;

"use client";

import React from "react";
import TrueFocus from "./TrueFocus";
import PlatformContainer from "../PlatFormContainer";
import RobotContainer from "../RobotContainer";
import LogoHoverEffect from "../Logoe";
const AnimatedHero = () => {
	return (
		<div className="relative w-full h-screen overflow-hidden">
			<div className="relative z-10 grid items-center h-full grid-cols-1 lg:grid-cols-2">
				{/* Left side - Robot and Platform */}
				<div className="flex flex-col items-center justify-center h-full mb-[25vh] ml-[-25vh] max-sm:scale-75 ">
					<div className="relative flex flex-col items-center w-3/4 max-sm:ml-[40vh] max-sm:mt-42">
						{/* Robot positioned above platform */}
						<div className="w-full mb-[-90px] max-sm:mb-[-220px]">
							<RobotContainer />
						</div>
						{/* Platform positioned below robot */}
						<div className="z-10 w-4/5 mr-[20vh]  mb-[10vh]  bottom-10 max-sm:ml-36">
							<PlatformContainer />
						</div>
					</div>
				</div>

				{/* Right side - Text content */}
				<div className="flex flex-col items-center justify-center h-full">
					<TrueFocus
						sentence="WELCOME TO 3D WORLD OF"
						manualMode={false}
						blurAmount={7}
						borderColor="#00FFFF"
						glowColor="rgba(0, 255, 255, 0.6)"
					/>
					<div>
						<LogoHoverEffect text="AXIS 25" />
					</div>
					<p className="max-w-2xl px-4 mx-auto mt-6 text-xl text-gray-300">
						Experience the future of technology at our premier tech festival
					</p>
				</div>
			</div>
		</div>
	);
};

export default AnimatedHero;
