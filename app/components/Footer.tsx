import { Command } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return <footer className="border-t mt-12 border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-600 text-white">
                  <Command className="h-4 w-4" />
                </div>
                <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  CCK Retail
                </span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Empowering modern retailers with robust point of sale and inventory management tools.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Features</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Pricing</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Hardware Integration</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Changelog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Documentation</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Help Center</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Retail Blog</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Contact Sales</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between border-t border-slate-200 pt-8 dark:border-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} CCK Retail. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0 text-slate-400">
              <Link href="#" className="hover:text-slate-600 dark:hover:text-slate-300">
                
              </Link>
              {/* Add more social icons as needed */}
            </div>
          </div>
        </div>
      </footer>;
};

export default Footer;
