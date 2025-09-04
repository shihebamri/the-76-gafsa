import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

export default function FeatureTiles() {
  return (
    <section className="bg-gradient-to-b from-[#181b20] to-[#121417] py-16">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-4xl font-extrabold text-white drop-shadow-lg">
          Special Events
        </h2>
        <p className="mt-4 text-lg text-zinc-300 max-w-2xl mx-auto">
          Make your moment unforgettable at <span className="text-[#EDB95E] font-semibold">76 Café Resto</span> — whether it's a birthday party, a wedding, or a business meeting.
        </p>
        <div className="mt-12">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 1500, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            style={{ paddingBottom: '2.5rem' }}
          >
            <SwiperSlide>
              <div
                className="relative rounded-2xl border border-[#EDB95E]/20 shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden flex flex-col min-h-[340px]"
                style={{ backgroundImage: "url('/76/birthday.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="absolute inset-0 bg-[#1a1d21]/80" />
                <div className="relative p-8 flex-1 flex flex-col items-center justify-center text-center z-10">
                  <h3 className="text-2xl font-bold text-[#EDB95E]">Birthdays</h3>
                  <p className="mt-3 text-zinc-300">
                    Celebrate your special day in a warm atmosphere with a personalized menu and festive decorations.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="relative rounded-2xl border border-[#EDB95E]/20 shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden flex flex-col min-h-[340px]"
                style={{ backgroundImage: "url('/76/wedding.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="absolute inset-0 bg-[#1a1d21]/80" />
                <div className="relative p-8 flex-1 flex flex-col items-center justify-center text-center z-10">
                  <h3 className="text-2xl font-bold text-[#EDB95E]">Weddings</h3>
                  <p className="mt-3 text-zinc-300">
                    An elegant and intimate setting to say “yes” surrounded by your loved ones, with custom catering service.
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div
                className="relative rounded-2xl border border-[#EDB95E]/20 shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden flex flex-col min-h-[340px]"
                style={{ backgroundImage: "url('/76/meeting.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
              >
                <div className="absolute inset-0 bg-[#1a1d21]/80" />
                <div className="relative p-8 flex-1 flex flex-col items-center justify-center text-center z-10">
                  <h3 className="text-2xl font-bold text-[#EDB95E]">Meetings</h3>
                  <p className="mt-3 text-zinc-300">
                    Host your business meetings in a quiet space, equipped for your presentations and discussions.
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
