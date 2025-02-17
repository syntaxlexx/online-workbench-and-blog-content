import { siteInfo } from "@/lib/constants";
import Link from "next/link";

const Footer = () => {
  return (
    <section className="py-8">
      <div className="container">
        <footer>
          <div className="mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <p>
              © {new Date().getFullYear()} {siteInfo.name}
            </p>
            <ul className="flex gap-4">
              <li className="underline hover:text-primary">
                <Link href="#"> Terms and Conditions</Link>
              </li>
              <li className="underline hover:text-primary">
                <Link href="#"> Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Footer;
