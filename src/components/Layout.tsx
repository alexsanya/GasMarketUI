import '../app/globals.css'
import './captions.css'
import { Logo } from '../components/Logo'

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <div className="grid h-screen grid-cols-2">
        <div className="bg-white-500">
          <section>
            <div className="grid h-screen grid-rows-2">
              <div className="flex flex-row">
                  <Logo />
              </div>
              <div className="flex flex-col justify-between">
                  <div className="mainHeader">Web3.0 resque service</div>
                  <div className="subHeader">Jumpstart your wallet here</div>
                  <div className="mb-auto description">Exchange your ERC20 to native gas tokens via meta transaction.<br/>
Secure peer-to-peer swap</div>
                  <footer className="bg-white rounded-lg">
                      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                        <ul className="flex w-full justify-between items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">How it works</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">Became gas provider</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline me-4 md:me-6">Report a problem</a>
                            </li>
                        </ul>
                      </div>
                  </footer>
              </div>
            </div>
          </section>
        </div>

        <div className="bg-gray-800">
          { children }
        </div>
      </div>
    </section>
  )
}
