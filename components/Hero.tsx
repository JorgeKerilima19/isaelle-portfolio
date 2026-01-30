import { getTranslations } from "next-intl/server";
import banner from "@/public/images/banner.jpeg";
import "./styles.css";

export const Hero = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <section className="flex items-center justify-between h-screen">
      <div className="h-full w-2/4 flex flex-col gap-24 items-center justify-center bg-letter">
        <h1 className="text-[7rem] font-bold text-primary">Isaelle Costa</h1>
        <div className="grid gap-4">
          <h2 className="text-[1.6rem] font-bold text-center">{t("greeting")}</h2>
          <p className="text-[1.85rem] font-light max-w-4xl text-center">{t("description")}</p>
        </div>
        <div className="flex gap-16">
          <button className="text-[1.8rem] border border-gray-950 py-4 px-12 bg-gray-100 text-gray-950 hover:bg-gray-900 transition duration-300 hover:text-gray-100">
            {t("button2")}
          </button>
          <button className="text-[1.8rem] border border-gray-100 py-4 px-12 bg-gray-950 text-gray-100 hover:bg-gray-100 hover:border-gray-950 hover:text-gray-950 transition duration-300">
            {t("button1")}
          </button>
        </div>
      </div>
      <div className="hero_banner relative  w-2/4 h-full">
        <img className="w-full h-full object-cover" src={banner.src} alt="" />
      </div>
    </section>
  );
};
