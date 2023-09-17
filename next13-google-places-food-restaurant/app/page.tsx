import Button from "@/components/button";
import CategoriesList from "@/components/home/categories-list";
import GoogleMapView from "@/components/home/google-map-view";
import PageContent from "@/components/home/page-content";
import RangeSelect from "@/components/home/range-select";
import SelectRating from "@/components/home/select-rating";
import UserCurrentLocation from "@/components/user-current-location";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if (!session?.user) return redirect("/login");

  return (
    <>
      <UserCurrentLocation />
      <PageContent />
    </>
  );
}
