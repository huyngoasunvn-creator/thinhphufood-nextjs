import type { Metadata } from "next";
import { notFound } from "next/navigation";
import connectDB from "@/lib/connectDB";
import EventEmbed from "@/models/EventEmbed";
import { createPageMetadata } from "@/lib/seo";

export const revalidate = 3600;

type PageProps = {
  params: {
    slug: string;
  };
};

async function getEventBySlug(slug: string) {
  await connectDB();

  return EventEmbed.findOne({
    slug,
    isActive: true,
  }).lean();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const eventPage = await getEventBySlug(params.slug);

  if (!eventPage) {
    return createPageMetadata({
      title: "Khong tim thay su kien",
      description: "Su kien khong ton tai hoac da ket thuc.",
      path: `/event/${params.slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: String(eventPage.title || "Su kien"),
    description: `Thong tin chi tiet ve su kien ${String(
      eventPage.title || "",
    )} cua Thinh Phu Food.`,
    path: `/event/${params.slug}`,
  });
}

export default async function EventPage({ params }: PageProps) {
  const eventPage = await getEventBySlug(params.slug);

  if (!eventPage) {
    return notFound();
  }

  return (
    <div className="w-full h-screen">
      <iframe
        src={String(eventPage.externalUrl)}
        title={String(eventPage.title || "Su kien")}
        className="w-full h-full border-0"
      />
    </div>
  );
}
