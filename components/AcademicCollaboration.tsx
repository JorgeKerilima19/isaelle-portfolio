// components/AcademicCollaboration.tsx
import { getTranslations } from "next-intl/server";

export async function AcademicCollaboration() {
  const t = await getTranslations("collaboration");

  // Collaboration areas - you can customize these
  const collaborationAreas = [
    t("area1"),
    t("area2"),
    t("area3"),
    t("area4"),
    t("area5"),
  ];

  return (
    <div className=" bg-gray-50 ">
      <section className="text-[1.5rem] p-16 bg-gray-50 mt-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-primary my-12">
            {t("title")}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                {t("contact_info")}
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-amber-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {t("email_label")}
                    </p>
                    <p className="text-gray-600">isaelle@example.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-amber-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {t("institution_label")}
                    </p>
                    <p className="text-gray-600">{t("university")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-3">
                {t("invitation_title")}
              </h4>
              <p className="text-gray-600 mb-4">{t("invitation_text")}</p>
              <a
                href="mailto:isaelle@example.com"
                className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-md font-medium transition-colors"
              >
                {t("contact_button")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Collaboration Areas */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              {t("areas_title")}
            </h3>
            <div className="space-y-4">
              {collaborationAreas.map((area, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="shrink-0 mt-1">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                  </div>
                  <p className="text-gray-700">{area}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
