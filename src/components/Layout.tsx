import '../app/globals.css'
import './captions.css'
import { Logo } from '../components/Logo'

const styles = {
  Background: {
    background: '#EDEDED'
  },
  Panel: {
    width: '50%',
    margin: '20px',
    borderRadius: '20px'
  },
  FooterLink: {
    color: '#326DC8'
  },
  MenuPanel: {
    height: '80%',
    margin: 'auto'
  }
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <div className="flex h-screen flex-row" style={styles.Background}>
        <div className="bg-white" style={styles.Panel}>
          <section>
            <div className="grid h-screen grid-rows-2">
              <div className="flex flex-row">
                  <Logo />
              </div>
              <div className="flex flex-col justify-between" style={styles.MenuPanel}>
                  <div className="mainHeader">Web3.0 resque service</div>
                  <div className="mb-auto description">Exchange your ERC20 to native gas tokens via meta transaction.<br/>
Secure peer-to-peer swap</div>
                    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                      <ul className="flex w-full justify-between items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                          <li>
                              <a href="#" className="underline" style={styles.FooterLink}>How it works</a>
                          </li>
                          <li>
                              <a href="#" className="underline" style={styles.FooterLink}>Became gas provider</a>
                          </li>
                          <li>
                              <a href="#" className="underline" style={styles.FooterLink}>Report a problem</a>
                          </li>
                      </ul>
                    </div>
              </div>
            </div>
          </section>
        </div>

        <div style={styles.Panel}>
          { children }
        </div>
      </div>
    </section>
  )
}
