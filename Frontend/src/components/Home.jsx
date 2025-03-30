import axios from 'axios';
import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import { Video, Users, ShieldCheck, Clock } from "lucide-react";
// import videoCall from '../logos/videoCall.jpg';
// import { motion } from 'framer-motion';
import { Hero } from './Landing_Page/Hero.jsx';
import Features from './Landing_Page/Features.jsx';
import server from '../environment.js';
const Home = () => {
  useEffect(() => {
    // For google.signin
    if (!localStorage.getItem('googleMessage')) {
      axios.get(`${server}/auth/login/success`, { withCredentials: true })
        .then((response) => {
          toast.success(response.data.message);
          localStorage.setItem("googleMessage", true);
        })
        .catch((error) => {
          console.warn("Error:", error);
        });
    }

    // For Manual Sign in 
    const message = localStorage.getItem('flashMessage'); // ✅ Retrieve from localStorage
    if (message) {
      toast.success(message);
      localStorage.removeItem('flashMessage'); // ✅ Remove after showing
    }

  }, []);
  return (
    <div className="">
      <Hero />
      <Features/>
    </div>
  )
}

export default Home;
// import { Button } from "./Buttoon2";
// import { Card ,CardContent} from "./Card";
// import { motion } from "framer-motion";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center">
//       {/* Hero Section */}
//       <motion.div
//         className="text-center mt-20"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <h1 className="text-5xl font-bold text-gray-900">Seamless Video Conferencing</h1>
//         <p className="text-lg text-gray-600 mt-4">Connect, collaborate, and communicate effortlessly.</p>
//         <div className="mt-6 flex gap-4 justify-center">
//           <Button className="px-6 py-3 bg-blue-600 text-white rounded-xl">Start a Meeting</Button>
//           <Button className="px-6 py-3 bg-gray-300 text-gray-800 rounded-xl">Join a Meeting</Button>
//         </div>
//       </motion.div>

//       {/* Features Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 px-10">
//         {features.map((feature, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.4, delay: index * 0.2 }}
//           >
//             <Card className="p-6 shadow-lg border rounded-2xl bg-white">
//               <CardContent className="flex flex-col items-center">
//                 <feature.icon className="text-blue-600 w-12 h-12 mb-4" />
//                 <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
//                 <p className="text-gray-600 mt-2 text-center">{feature.description}</p>
//               </CardContent>
//             </Card>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }

const features = [
  {
    title: "HD Video & Audio",
    description: "Experience crystal-clear video and audio calls.",
    icon: Video,
  },
  {
    title: "End-to-End Encryption",
    description: "Your conversations remain private and secure.",
    icon: ShieldCheck,
  },
  {
    title: "Multi-User Meetings",
    description: "Host large meetings with multiple participants.",
    icon: Users,
  },
  {
    title: "24/7 Availability",
    description: "Join meetings anytime, anywhere.",
    icon: Clock,
  },
];
