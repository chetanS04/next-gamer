"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import axios from "../../../utils/axios";
import { TfiSharethis } from "react-icons/tfi";
import gameLogo1 from '@/public/gameLogo1.png'

import Image from "next/image";import { FaBolt, FaLock, FaStar, FaGift, FaCreditCard, FaGamepad } from "react-icons/fa";
import { useLoader } from "@/context/LoaderContext";


// Types
type Game = {
  id: number;
  name: string;
  description: string;
  primary_image: string;
};

type Slider = {
  id: number;
  title: string;
  image: string;
};

interface Faq {
  id: number;
  question: string;
  answer: string;
}

// ENV/Design constants
const imageHost = "http://localhost:8000/storage/";
const mainBg = "rgb(33, 37, 41)";
const accentBg = "rgb(5, 51, 69)";

export default function GamesPage() {
  // Sliders state
  const [sliders, setSliders] = useState<Slider[]>([]);
  const {showLoader ,hideLoader} = useLoader()
    const [faqs, setFaqs] = useState<Faq[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  useEffect(() => {
    axios
      .get("/api/slider-active")
      .then((res) => setSliders(res.data.data || []))
      .catch(() => setSliders([]));
  }, []);

  const toggleFaq = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };



const getFaqs = useCallback(async () => {
  showLoader();
  try {
    const response = await axios.get("/api/get-all-active-faq");
    setFaqs(response.data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    hideLoader();
  }
}, []); 

useEffect(() => {
  getFaqs();
}, [getFaqs]);


  const features = [
    {
      icon: <FaBolt size={24} className="text-white" />,
      title: "Lightning-Fast Reload",
      desc: "Instant top up into your favorite games",
      bg: "bg-orange-400 text-white",
      highlight: true,
    },
    {
      icon: <FaLock size={24} className="text-green-400" />,
      title: "Safest Top Ups",
      desc: "Every transaction is protected in an ironclad fortress",
    },
    {
      icon: <FaGamepad size={24} className="text-yellow-400" />,
      title: "Games Galore",
      desc: "More than 50 games available",
    },
    {
      icon: <FaStar size={24} className="text-yellow-200" />,
      title: "Best Value Game Credits",
      desc: "We offer the best value for game credits",
    },
    {
      icon: <FaGift size={24} className="text-orange-200" />,
      title: "Get Rewarded Everytime",
      desc: "Save more as you buy UniPin Credits",
    },
    {
      icon: <FaCreditCard size={24} className="text-orange-400" />,
      title: "Convenient Payment Methods",
      desc: "We have all popular payment channels for your convenience",
    },
  ];


  // Games API
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/games")
      .then((res) => setGames(res.data.games || []))
      .catch(() => setGames([]))
      .finally(() => setLoading(false));
  }, []);


  return (
    <>
      {/* landing area start */}
      <section className="mt-10 text-white">
        <div className="container">
          <div className="">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              speed={2000}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              className="w-full border-white/80 border rounded-xl"
            >
              {sliders.length === 0 ? (
                // Optionally show a loader or placeholder
                <div className="flex justify-center items-center h-56 bg-gray-950 text-blue-100 font-bold text-xl">
                  No slides found
                </div>
              ) : (
                sliders.map((slide) => (
                  <SwiperSlide key={slide.id} className="group">
                    <div className="relative z-0 aspect-[32/10] overflow-hidden rounded-xl bg-gray-900  ">
                      {slide.image ? (
                        <Image
                          src={`${imageHost}${slide.image}`}
                          alt={slide.title || "Featured Game Slide"}
                          className="absolute -z-10 inset-0 w-full h-full object-cover"
                          loading="lazy"
                          height={600}
                      width={600}
                          draggable={false}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full text-6xl text-gray-700 bg-gray-800 opacity-60">
                          🎮
                        </div>
                      )}

                      {/* Optionally: overlay caption */}
                      {slide.title && (
                        <div className="h-full w-full bg-black/50 p-10 flex justify-between items-end">
                          <div className="-translate-y-8 opacity-0 transition-all duration-[1000ms] group-[.swiper-slide-active]:translate-y-0 group-[.swiper-slide-active]:opacity-100 group-[.swiper-slide-active]:delay-[1000ms] ease-in-out">
                            <h2 className="text-5xl font-bold text-white mb-4">
                              {slide.title}
                            </h2>
                            <div className="flex gap-2 justify-start items-center">
                              <button className="bg-gc-600 shadow-md shadow-white/20 text-white font-semibold text-lg px-10 py-3 rounded-lg">
                                Read More
                              </button>
                              <TfiSharethis className="text-white size-6" />
                            </div>
                          </div>

                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))
              )}
            </Swiper>

          </div>
        </div>
      </section>
      {/* landing area end */}

      {/* Exclusive Offers section start */}
      <section className="my-14 text-white">
        <div className="container">
          <div className="rounded-xl bg-gc-900 p-5">
            <h3 className="text-2xl text-white font-semibold mb-6">Exclusive Offers</h3>

            <div className="flex gap-5 flex-wrap justify-center items-stretch">
              <div className="flex-[1_1_200px]">
                <div className="card">
                  <div className="gameInfo flex gap-4 justify-start items-center">
                    <div className="size-16 aspect-square rounded-2xl overflow-hidden">
                      <Image src={gameLogo1} alt="game logo" height={600} width={600} className="h-full w-full object-cover" />
                    </div>
                    <div className="text-white">
                      <h5 className="imageName text-base font-semibold">Battlegrounds Mobile India</h5>
                      <h6 className="imageMadeIn text-xs font-light text-white/60">KRAFTON India</h6>
                    </div>
                  </div>
                  <div className="mt-3 rounded-lg flex overflow-hidden bg-gc-600 border-2 border-orange-500">
                    <div className="grow px-2 py-1 flex flex-col justify-center">
                      <div className="text-white fbold">
                        <span className="text-xs">INR</span>
                        <span className="text-base">
                          75.00
                        </span>
                      </div>

                      <div className="font-xs text-gc-300 line-through">
                        89.00
                      </div>
                    </div>

                    <svg className="shrink-0 mr-[-1px]" width="14px" height="46px" viewBox="0 0 12 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.67426 19H1.67571C0.918689 19 0.436183 18.1915 0.79561 17.5252L9.41912 1.54017C9.9309 0.591503 10.9221 0.000288123 12 0.000750224V40L2 39.9994L7.63578 20.2747C7.81831 19.6359 7.33864 19 6.67426 19Z" fill="url(#paint0_linear_3023_44370)"></path>

                      <defs>
                        <linearGradient id="paint0_linear_3023_44370" x1="8.37499" y1="0" x2="8.37499" y2="40" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FE055F"></stop>
                          <stop offset="1" stopColor="#FF8844"></stop>
                        </linearGradient>
                      </defs>
                    </svg>

                    <div className="grow px-2 py-1 bg-gradient-to-b from-[#FE055F] to-[#ff8845]">
                      <div className="font-semibold text-sm text-center">Savings</div>
                      <div className="font-bold text-center">
                        INR 14.00
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-[1_1_200px]">
                <div className="card">
                  <div className="gameInfo flex gap-4 justify-start items-center">
                    <div className="size-16 aspect-square rounded-2xl overflow-hidden">
                      <Image src={gameLogo1}height={600} width={600}  alt="game logo" className="h-full w-full object-cover" />
                    </div>
                    <div className="text-white">
                      <h5 className="imageName text-base font-semibold">Battlegrounds Mobile India</h5>
                      <h6 className="imageMadeIn text-xs font-light text-white/60">KRAFTON India</h6>
                    </div>
                  </div>
                  <div className="mt-3 rounded-lg flex overflow-hidden bg-gc-600 border-2 border-orange-500">
                    <div className="grow px-2 py-1 flex flex-col justify-center">
                      <div className="text-white fbold">
                        <span className="text-xs">INR</span>
                        <span className="text-base">
                          75.00
                        </span>
                      </div>

                      <div className="font-xs text-gc-300 line-through">
                        89.00
                      </div>
                    </div>

                    <svg className="shrink-0 mr-[-1px]" width="14px" height="46px" viewBox="0 0 12 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.67426 19H1.67571C0.918689 19 0.436183 18.1915 0.79561 17.5252L9.41912 1.54017C9.9309 0.591503 10.9221 0.000288123 12 0.000750224V40L2 39.9994L7.63578 20.2747C7.81831 19.6359 7.33864 19 6.67426 19Z" fill="url(#paint0_linear_3023_44370)"></path>

                      <defs>
                        <linearGradient id="paint0_linear_3023_44370" x1="8.37499" y1="0" x2="8.37499" y2="40" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FE055F"></stop>
                          <stop offset="1" stopColor="#FF8844"></stop>
                        </linearGradient>
                      </defs>
                    </svg>

                    <div className="grow px-2 py-1 bg-gradient-to-b from-[#FE055F] to-[#ff8845]">
                      <div className="font-semibold text-sm text-center">Savings</div>
                      <div className="font-bold text-center">
                        INR 14.00
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-[1_1_200px]">
                <div className="card">
                  <div className="gameInfo flex gap-4 justify-start items-center">
                    <div className="size-16 aspect-square rounded-2xl overflow-hidden">
                      <Image  height={600} width={600}  src={gameLogo1} alt="game logo" className="h-full w-full object-cover" />
                    </div>
                    <div className="text-white">
                      <h5 className="imageName text-base font-semibold">Battlegrounds Mobile India</h5>
                      <h6 className="imageMadeIn text-xs font-light text-white/60">KRAFTON India</h6>
                    </div>
                  </div>
                  <div className="mt-3 rounded-lg flex overflow-hidden bg-gc-600 border-2 border-orange-500">
                    <div className="grow px-2 py-1 flex flex-col justify-center">
                      <div className="text-white fbold">
                        <span className="text-xs">INR</span>
                        <span className="text-base">
                          75.00
                        </span>
                      </div>

                      <div className="font-xs text-gc-300 line-through">
                        89.00
                      </div>
                    </div>

                    <svg className="shrink-0 mr-[-1px]" width="14px" height="46px" viewBox="0 0 12 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.67426 19H1.67571C0.918689 19 0.436183 18.1915 0.79561 17.5252L9.41912 1.54017C9.9309 0.591503 10.9221 0.000288123 12 0.000750224V40L2 39.9994L7.63578 20.2747C7.81831 19.6359 7.33864 19 6.67426 19Z" fill="url(#paint0_linear_3023_44370)"></path>

                      <defs>
                        <linearGradient id="paint0_linear_3023_44370" x1="8.37499" y1="0" x2="8.37499" y2="40" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FE055F"></stop>
                          <stop offset="1" stopColor="#FF8844"></stop>
                        </linearGradient>
                      </defs>
                    </svg>

                    <div className="grow px-2 py-1 bg-gradient-to-b from-[#FE055F] to-[#ff8845]">
                      <div className="font-semibold text-sm text-center">Savings</div>
                      <div className="font-bold text-center">
                        INR 14.00
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-[1_1_200px]">
                <div className="card">
                  <div className="gameInfo flex gap-4 justify-start items-center">
                    <div className="size-16 aspect-square rounded-2xl overflow-hidden">
                      <Image height={600} width={600}  src={gameLogo1} alt="game logo" className="h-full w-full object-cover" />
                    </div>
                    <div className="text-white">
                      <h5 className="imageName text-base font-semibold">Battlegrounds Mobile India</h5>
                      <h6 className="imageMadeIn text-xs font-light text-white/60">KRAFTON India</h6>
                    </div>
                  </div>
                  <div className="mt-3 rounded-lg flex overflow-hidden bg-gc-600 border-2 border-orange-500">
                    <div className="grow px-2 py-1 flex flex-col justify-center">
                      <div className="text-white fbold">
                        <span className="text-xs">INR</span>
                        <span className="text-base">
                          75.00
                        </span>
                      </div>

                      <div className="font-xs text-gc-300 line-through">
                        89.00
                      </div>
                    </div>

                    <svg className="shrink-0 mr-[-1px]" width="14px" height="46px" viewBox="0 0 12 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.67426 19H1.67571C0.918689 19 0.436183 18.1915 0.79561 17.5252L9.41912 1.54017C9.9309 0.591503 10.9221 0.000288123 12 0.000750224V40L2 39.9994L7.63578 20.2747C7.81831 19.6359 7.33864 19 6.67426 19Z" fill="url(#paint0_linear_3023_44370)"></path>

                      <defs>
                        <linearGradient id="paint0_linear_3023_44370" x1="8.37499" y1="0" x2="8.37499" y2="40" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FE055F"></stop>
                          <stop offset="1" stopColor="#FF8844"></stop>
                        </linearGradient>
                      </defs>
                    </svg>

                    <div className="grow px-2 py-1 bg-gradient-to-b from-[#FE055F] to-[#ff8845]">
                      <div className="font-semibold text-sm text-center">Savings</div>
                      <div className="font-bold text-center">
                        INR 14.00
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-[1_1_200px]">
                <div className="card">
                  <div className="gameInfo flex gap-4 justify-start items-center">
                    <div className="size-16 aspect-square rounded-2xl overflow-hidden">
                      <Image height={600} width={600}   src={gameLogo1} alt="game logo" className="h-full w-full object-cover" />
                    </div>
                    <div className="text-white">
                      <h5 className="imageName text-base font-semibold">Battlegrounds Mobile India</h5>
                      <h6 className="imageMadeIn text-xs font-light text-white/60">KRAFTON India</h6>
                    </div>
                  </div>
                  <div className="mt-3 rounded-lg flex overflow-hidden bg-gc-600 border-2 border-orange-500">
                    <div className="grow px-2 py-1 flex flex-col justify-center">
                      <div className="text-white fbold">
                        <span className="text-xs">INR</span>
                        <span className="text-base">
                          75.00
                        </span>
                      </div>

                      <div className="font-xs text-gc-300 line-through">
                        89.00
                      </div>
                    </div>

                    <svg className="shrink-0 mr-[-1px]" width="14px" height="46px" viewBox="0 0 12 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.67426 19H1.67571C0.918689 19 0.436183 18.1915 0.79561 17.5252L9.41912 1.54017C9.9309 0.591503 10.9221 0.000288123 12 0.000750224V40L2 39.9994L7.63578 20.2747C7.81831 19.6359 7.33864 19 6.67426 19Z" fill="url(#paint0_linear_3023_44370)"></path>

                      <defs>
                        <linearGradient id="paint0_linear_3023_44370" x1="8.37499" y1="0" x2="8.37499" y2="40" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#FE055F"></stop>
                          <stop offset="1" stopColor="#FF8844"></stop>
                        </linearGradient>
                      </defs>
                    </svg>

                    <div className="grow px-2 py-1 bg-gradient-to-b from-[#FE055F] to-[#ff8845]">
                      <div className="font-semibold text-sm text-center">Savings</div>
                      <div className="font-bold text-center">
                        INR 14.00
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Exclusive Offers section end */}

      {/* GAMES GRID */}
      <section className="flex-1">
        <div className="max-w-6xl mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <span className="animate-spin h-12 w-12 border-4 border-sky-400 border-t-transparent rounded-full" />
            </div>
          ) : games.length === 0 ? (
            <div className="text-center text-gray-400 mt-28 text-xl">
              ⚠️ No games available to sell yet.
              <br />
              Please check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-6">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="group border rounded-xl overflow-hidden shadow-xl hover:shadow-sky-900/30 transition flex flex-col"
                  style={{
                    background: `linear-gradient(135deg, ${mainBg} 78%, ${accentBg})`,
                    borderColor: "#184c5d",
                  }}
                >
                  <div
                    className="relative w-full h-48"
                    style={{ background: accentBg }}
                  >
                    {game.primary_image ? (
                      <Image
                      height={600} width={600} 
                        src={imageHost + game.primary_image}
                        alt={game.name}
                        className="w-full h-48 object-cover transition-transform group-hover:scale-105 duration-200"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-6xl text-gray-700 opacity-50">
                        🎮
                      </span>
                    )}
                    <div className="absolute top-2 left-2 bg-[#053345] text-white text-xs px-3 py-1 rounded-full font-semibold shadow shadow-blue-800/40">
                      Game ID: {game.id}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col p-4">
                    <h2 className="font-bold text-xl text-[#72c4e9] group-hover:text-[#bff6ff] transition">
                      {game.name}
                    </h2>
                    <p className="text-gray-300 text-sm mb-4 mt-2 flex-1">
                      {game.description}
                    </p>
                    <Link
                      href={`/sell-game/${game.id}`}
                      className="inline-block mt-auto px-4 py-2 rounded-lg text-center font-bold shadow hover:brightness-110 transition"
                      style={{
                        background:
                          "linear-gradient(90deg, #1179af 40%, #0c2129 100%)",
                        color: "#cafdff",
                        border: ".0938rem solid #369dcc",
                        boxShadow: "0 .125rem .75rem 0 #05334540",
                      }}
                    >
                      Sell This Game
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-6">
            {games.map((game) => (
              <div
                key={game.id}
                className="group border rounded-xl overflow-hidden shadow-xl hover:shadow-sky-900/30 transition flex flex-col"
                style={{
                  background: `linear-gradient(135deg, ${mainBg} 78%, ${accentBg})`,
                  borderColor: "#184c5d",
                }}
              >
                <div
                  className="relative w-full h-48"
                  style={{ background: accentBg }}
                >
                  {game.primary_image ? (
                    <Image
                      src={imageHost + game.primary_image}
                      alt={game.name}
                      height={600}
                      width={600}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105 duration-200"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-6xl text-gray-700 opacity-50">
                      🎮
                    </span>
                  )}
                  <div className="absolute top-2 left-2 bg-[#053345] text-white text-xs px-3 py-1 rounded-full font-semibold shadow shadow-blue-800/40">
                    Game ID: {game.id}
                  </div>
                </div>
                <div className="flex-1 flex flex-col p-4">
                  <h2 className="font-bold text-xl text-[#72c4e9] group-hover:text-[#bff6ff] transition">
                    {game.name}
                  </h2>
                  <p className="text-gray-300 text-sm mb-4 mt-2 flex-1">
                    {game.description}
                  </p>
                  <Link
                    href={`/buy-game/${game.id}`}
                    className="inline-block mt-auto px-4 py-2 rounded-lg text-center font-bold shadow hover:brightness-110 transition"
                    style={{
                      background:
                        "linear-gradient(90deg, #1179af 40%, #0c2129 100%)",
                      color: "#cafdff",
                      border: ".0938rem solid #369dcc",
                      boxShadow: "0 .125rem .75rem 0 #05334540",
                    }}
                  >
                    Buy This Game
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{
        background: `linear-gradient(90deg, ${mainBg} 75%, ${accentBg})`,

      }} className=" py-10 px-2 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-1">UniPin Advantage</h2>
          <p className="text-gray-300 mb-8">Dominate the game with rapid top-ups, unyielding protection, and rewards made for legends.</p>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div
                  key={i}
                  className={`rounded-lg p-4 shadow ${f.highlight ? "bg-orange-400 text-white" : "bg-[#23273a]"
                    }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {f.icon}
                    <span className={`font-semibold ${f.highlight ? "text-white" : ""}`}>{f.title}</span>
                  </div>
                  <p className={`text-sm ${f.highlight ? "text-white" : "text-gray-300"}`}>{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex-1 flex flex-col items-center justify-center bg-[#23273a] rounded-lg shadow p-8">
              {/* Placeholder for image or illustration */}
              <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
                <circle cx="70" cy="70" r="60" stroke="#FFA726" strokeWidth="8" />
                <path d="M70 40V70L100 80" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
                <circle cx="70" cy="70" r="8" fill="#FFA726" />
                <polyline points="10,10 30,0 40,20" fill="none" stroke="#FFA726" strokeWidth="4" />
              </svg>
              <h3 className="mt-6 text-xl font-bold">LIGHTNING FAST RELOAD</h3>
              <p className="text-gray-300 mt-2 text-center">Instant top up into your favorite games</p>
            </div>
          </div>
        </div>
      </section>


       <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={faq.id} className="border rounded-lg">
            <button
              onClick={() => toggleFaq(index)}
              className="w-full text-left px-4 py-3 font-semibold flex justify-between items-center"
            >
              {faq.question}
              <span>{activeIndex === index ? "−" : "+"}</span>
            </button>
            {activeIndex === index && (
              <div className="px-4 pb-3 text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>

      {/* FOOTER */}


    </>
  );
}




