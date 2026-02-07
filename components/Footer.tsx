// components/Footer.tsx
import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="bg-gray-900 text-white py-12">
      <section className="text-[1.3rem] px-4 sm:px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-3xl font-bold mb-4 text-amber-500">
              {t("about")}
            </h3>
            <p className="text-gray-300 leading-relaxed">{t("description")}</p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-3xl font-bold mb-4 text-amber-500">
              {t("contact")}
            </h3>
            <address className="not-italic text-gray-300 space-y-2">
              <p>{t("email")}</p>
              <p>{t("academic")}</p>
            </address>
          </div>

          {/* Languages Section */}
          <div>
            <h3 className="text-3xl font-bold mb-4 text-amber-500">
              {t("languages")}
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-600 rounded-full text-md">
                Español
              </span>
              <span className="px-3 py-1 bg-green-600 rounded-full text-md">
                Português
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} {t("copyright")}
          </p>
        </div>
      </section>
    </footer>
  );
}
