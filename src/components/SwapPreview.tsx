const styles = {
  Icon: {
    fontSize: '27px',
    width: '72px',
    height: '52px',
    color: '#161616',
    fill: '#161616',
  },
  amount:{
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: 400,
    lineHeight: '28px',
    textAlign: 'center',
  },
  container: {
    display: 'flex',
    height: '52px',
    flexDirection: 'column',
    justifyContent: 'center',
  }
};

const IconComponent = () => (
  <svg style={styles.Icon} viewBox="0 0 72 52" width="72" height="52" fill="none">
    <g opacity="100%" filter="url(#filter_dshadow_0_0_0_00000014)">
      <rect x="0" y="0" width="72" height="52" rx="8" fill="url(#image-pattern-8913429f-e0ba-4bba-9b1c-52599989d2cc)"></rect>
      <defs>
        <pattern id="image-pattern-8913429f-e0ba-4bba-9b1c-52599989d2cc" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use href="#image_https://assets.api.uizard.io/api/cdn/stream/18c3a6bb-2eef-4335-898a-8430c19ed499.png" transform="matrix(0.003125 0 0 0.004326923076923077 0 -0.19230769230769232)"></use>
        </pattern>
      </defs>
    </g>
    <defs>
      <filter id="filter_dshadow_0_0_0_00000014" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse">
        <feFlood flood-opacity="0" result="bg-fix"></feFlood>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="alpha"></feColorMatrix>
        <feOffset dx="0" dy="0"></feOffset>
        <feGaussianBlur stdDeviation="0"></feGaussianBlur>
        <feComposite in2="alpha" operator="out"></feComposite>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"></feColorMatrix>
        <feBlend mode="normal" in2="bg-fix" result="bg-fix-filter_dshadow_0_0_0_00000014"></feBlend>
        <feBlend in="SourceGraphic" in2="bg-fix-filter_dshadow_0_0_0_00000014" result="shape"></feBlend>
      </filter>
      <image id="image_https://assets.api.uizard.io/api/cdn/stream/18c3a6bb-2eef-4335-898a-8430c19ed499.png" width="320" height="320" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAFACAYAAADNkKWqAAAAAXNSR0IArs4c6QAAIABJREFUeF7tne13V8W1x7+sdfuia91/wPZ16f/Qv6Bv7ksgISCEQATBYIygWLnIQlFqUVHKykKgKoqUUgREREREBEFEnkQkCIqUB4EkQIIJoSHp2sM5KQ95OA8zc2bmfGet3t6Sc2b2/uw539/s87BnGNhKSGAYgN4S+k2XgyeQcmrL4WwkQAIk4DCBlKqWwhMKYApYPJQESCAsAhTAsOJJb0iABFIQoACmgMVDSUAbAXNZnTYTy9ARBbAMUaaPJEAC/RKgAHJikAAJ5CLg82KWApgr9DyZBEjAZwIUQKej5/Nvq9NgaRwJKAIUQE4EEiCB0hKgAJY29HScBEiAAsg5QAIkUFoCFMCgQ897iEGHl87lJkABzI2QHZAACfhKgALoa+RoNwmQQG4CFMDcCNkBCZCArwQogL5GjnaTAAnkJkABzI2QHZAACfhKwE0B5MNLX+cT7SYBrwi4KYBeIaSxJEACvhKgAPoaOet2c1luHTkHNE6AAmgcMQcgARJwlQAF0NXI0C4SIAHjBCiAxhFzABJwlYArtzWKs4MC6OrcpF0kQALGCVAAjSPmACRAAq4SoAC6GhnaRQIkoJVAf4k2BVArYnZGAiTgEwEKoE/Roq0kQAJaCVAAteJkZyTgMIHiHrY6C4UCmCA0ZZ83+f3P30OCMPEQEkhNgAKYABkv3wSQeAgJeEiAAuhh0GgyCZCAHgIUQD0cA+/FzhrYziiBh4rupSJAAUyFiweTAAmERIACGFI06QsJkEAqAhTAVLh4MAmQQEgEKIAhRZO+kAAJpCJAAUyFiweTAAmkI+D2oy0KYLpo8mgSSE3AbQlI7U5QJ1AAgwonnSEBEkhDgAKYhhaPJQES0EDAnTWxWwLoDhcNQWYXJEACrhNwSwBdp0X7SIAEgiJAAQwqnAU6w9V7gfA5dFYCdwsgJ3FWjjyPBEggEQG3RIYrwERB40EkQAIhEqAAhhhV+kQCJJCIAAUwEaaBD3JrQZ/TGZ5OAp4TSHs9UgA9DzjNjwmknfokRwIABZCzgAQSEqDEJgTl0WEUQI+CRVNJgATyELj/J4wCmIfnPedyhaARZpm74kSyFn0KoDXUHIgE/CDQr/4GKsoUQD/mJK0kARIwQIACaAAquyQBEvCDAAXQjzjRShIgAQMEKIAGoLLLwQkEejuJYc9CoODJQAHMEjSeQwJOEyhYVZxmc7dxFEDtweLk04j0NwDOZ+mPUchCrXznpBNAzqryzZBiPT4IYBGAN4o1g6MPTMBvUUgngJwHJGCXQBOGYTh6lQBOBdBhd3iOloyAvyJ4hwD660SyIA11VNn9H4pPIX9vAjA8GvkogBEAjhdiCQcNkgBXgLnDSuHMjXDgDpQAPvDAA7hw4YIcdR3AFABvGxyTXZeIAAWwRMH20FUlgAcOHMDLL7+MlStXxi4sA/AIgBse+uSmyYX/jhdjAAXQzelIq24TUALY1NSE3/3ud1i+fDnq6urQ2dkpfzsSpcQnCIsEshKgAGYlx/NsEOgTwOHDb98KPHz4MEaOHIkTJ5TutQF4CMBqG8ZwjPAIUADDi2lIHjUBw4Y3NR1HLIDiXHt7O2pra7F6dZ/uNQKoZ0ocUujt+EIBTMm5mDsVKY0M5/D7VoCxa729vWhsbER9fT26urrknw8AGAXgZOHuc5IUHoKkBlAAk5LicUUQGFAAY2PkAYmkxKdOnZJ/ugqgBsC6IozlmP4RoAD6F7MyWTykAAqMa9euYeLEiVi7dm3M5lUAMwDcLBMs+pqeAAUwPTOeYY9AIgEUcyQlXrx4MR5//HHcvKl0b1+UEp+2Zy5H0kHA5h0ECqCOiLEPUwQSC2BswFdffaVS4tOnle5JSjwOwEZTBrJfFwhkl0wKoAvxow39EhgGNPVG7wHe+RR4KFxXrlxBdXU1NmzYEB/6EoBZTImHIle+v1MAyxfzgj1O9WudegUYOycpsXw98uSTT+Lf//63/PPeKCU+UzAADu8QAQqgQ8GgKfcR6F8AewEknLl79uxBRUUFzpxRutcKYCyAzbdHSiXGDE+ABBJOowA9p0s+EMi8ArzTuZaWFowbNw4ffPCB/HMPgL8A+BOAbh8g0EZzBCiA5tiy5/wEtAigUr2eHrz44ot4+umn0d2tdG8XgEoAZ/ObWXAPXMhmDgAFMDM6nmiBgDYBjG3dtWuXSonPnTsn/9QMoArAVgu+cAgHCVAAHQwKTeojoF0ApefLly9j7Nix+Oijj+KUeD6AuUyJyzfzKIDli7lPHusVwDsenkhK/Pzzz2POnDm4deuWMNkRpcQ/+wSojLbqzPj7EUCd3ZcxPPRZDwE1DyMBlGowv8/W7RBPjHfs2IHRo0fHFadF/CQl3p5tMJ7lGwGuAH2LWLns1bsCHIDdxYsXUVVVhU8++SROiSUdfjZ6YqyVOJcXWnHm7owCmBshOzBIwIoAiv2SBs+bN0/9R9JjANui1eAlg/6x64IJUAAHDQB/rwuen9kFMMXL0nf6uG3bNrUavHRJ6Z5syi6vyuwsmAOHN0SAAmgILLvVQiC7AOYY/vz58+q+4GeffSa9yEuDcwC8YCIlzmEmT9VAgAKoASK7MEagEAFUqtfdrZ4Qy5Ni+a4YwJboMzp5d5AtEAIUwEACacONAm4IFCaAMc8tW7aodwabm5XuyVcjkhLLVyRsARCgAAYQxIBdKFwAleqdPau+Htm9e3ecEktpLSmxpZ6WsPlLgALob+zKYLkTAiigpaSWfEcs3xNHKfGmqNiqVJhh85TAgAJYQLpTMMLyeVww8CTDFyeAAzxF3rRpk6os09qqdE9qbMlOdFJrkM1DAlwBehi0EplcnAAOAvmnn35SKfHevUr3ZAOSJwC8UqK4BOOqdgHkOiqYueGCI04KoFK9mzdVtWmpOh219QCqo31IXGBHGxIQ0C6ACcb0+BDKu+XgOSuAfaq3fr3af+TqVdl/CT9EKfF+y5w4XEYCJRZAilnGOWPmtP7D4bwACowff/xR7US3f7/SPUmJGwAsNgOKveokUGIB1ImRfRki4IEA3n5a0tXVpfYklr2Joya7tNcAaDPExv9uHViDUAD9n0beezDIdeCBAN6Nf+3ataipqUFbm9K9kwBGADjkfZBcdyCjmFIAXQ9sue3zTgCV6p08qVLigwcPyv+8AWA6gKXlDqWb3lMA3YwLrbpNwEsBVKp34wbq6+vR2NgYx3I1gEkArjO4MYGMyzaNAO8RwOIN0ugbu/KfgLcCGKN/9913UVtbi+vXle6diFLiI/6HJgwPuAIMI46heuG9AKplbFOTSomPHDkiW7F39AKPAFgRatB88osCaDBaXE/nhhuEAAqFjo4O1NXVYfny5TGUtwBMkT/lpsQOMhOgAGZGxxMtEAhGAGNWK1euxJQpU/DLL7/IPx2LUmL5b7YCCFAAC4DOIRMTGFwAM5a9Tzy6oQOPHTuGESNGQP47WgHKSlBWhGyWCVAALQPncKkIhLUCvEOwZQX48MMP4623+nRP7gnKvUGmxKmmSL6DKYD5+PFsswTCEsB+WK1YsQLTpk1DZ2en/FWeDkt5reNmsbL3mAAFkHPBZQLBC6DA/+abb1RKLE+Lo/cEHwKwyuXAhGIbBdDDSJbo6XIpBFCmYHt7OyZPnoxVq/p0T74ckS9I5EsSNkMEKIC6wZZInXSj66e/0gig+C6l9pcuXYpHH31UfUkSfUMs3xLLN8VsBghQAA1AZZfaCAwigPc+Avb0kXA/qA4dOqRSYvmmOKomI1VlpLoMm2YCFEDNQNmdVgKlWgHeSU6qyUycOBH/+Mc/4n+WOltSZ1DqDbJpImBCAP+oyTZ2QwLy2cRv5OHA8OHDS0ejF71Y8tcleOyxx1QJfgBScVWeEkvlaTYNBPQK4O37X5KLFNR4A64g8EaHLasAxlCl0vSoUaPwww9K96T2vuw9InuQsOUkoFcAbxujBPCPf+RCMGdsMp8e2s/AsmXL8Nvf/jYzD2snGrwNKXuOTJgwAe+9917sjuxCJ7vRMSXOEWBjAhhtHj2oaQbnSw4kPJUE3CQg19SiRYswc+ZMtVF7tB+xpMSyP3HyZvQX0mjnyX1MeGShApjQRh5GAiRwB4Evv/xSpcSyPzEA2aF9HIBNhJSeAAUwPTOe4RmBEDON1tZWjB8/Hu+//75EowfASwBmAej2LDyFmksBLBS/ocFDvOINofK5256eHixcuBBPPfUUuruV7n0RPSU+O7BffqWopuOjWQAVXPUQJMk9QNPOsf8QCNyh5hT2fgO6e/duVFRU4OxZpXvNAMYC2BJC9E37oFkAlblhCSAvOtNzkP1rINDc3IwHH3wQH374YZwSvwBgDlPiweEaFkCqh4a5zS40EQh9NkpKvGDBAsyePRu3bt0SajsBVAI4rwlhcN0YFsDgeNEhEnCewM6dO1FZWYnz55XuXQJQBWCb84YXYCAFsADoHJIETBO4dOkSxowZg48//jhOiZ8FMDd6Ymx6eG/6pwB6E6o0hoae7KVhUd5jJQ1+7rnnMHfuXEh6DGB7tBr8ubxU7vY8UAGkAHCCk0BMYPv27Rg9ejQuXrwo/yTiJ/cFd1gh5PhbN4EKoJXQchCPCJT9J/HChQuoqqrCp59+KlGTlwYlHZ5f9pQ4fAEs+8z3SKR8MNXn6SQp8TPPPIP58+fHKfHW6J1BeVBSyha+AGoOq88XgGYU7M5TAlu3blUPSC5fviweyKNiKaiwy1N3cplNAcyFjyeTgJ8Ezp07p16V+fzzz+OU+E8A/lK2lJgC6Of8pdUkkJuAfD8sL03Ly9PRp6ubo5RYKsyUoikB1PygJqxP4UoxDUJwkjcnskZx8+bN6jO6lpYW6UJqC0pKvDdrfz6dxxWgT9GirSRgiMCZM2dUQYU9e/bICFJlWkprSYmtoBsFMOjw0jkSSL4ylirTs2bNUiW2orYxKrYq+5AE2SiAQYaVTpFAdgIbN25UxVavXLkinZyOUuJ92Xt098xcAjjAvcNi7gEm/6FzNxq0zCIBTpjBYJ8+fVqV3d+3T+mepMQzALxqMUAGhrpfsXIJYJ+Fd/dbjAAawMUuSaDMBGQv4hkzZuDVV/t0bx2AmmhrziDQ6BHAu1FQAIOYGvqcuHutxZWXPrJ2evrnP/+JmpoaXLt2TQaUzYlHADhgZ3Szo1AAU/DlpZsCFg8NisCpU6cwcuRIHDigdO8GgHoAjb47SQH0PYK0nwQsEbhx4wYaGhqwZMmSeMQ1ACYBaLNkgvZhKIDakbJDEgibwN///ndMmjQJ7e3t4uiJKCU+4qPXFEAfo+ayzSW+T1Am10+cOKFS4sOHD8cp8SMAlrk8NfuzjQLoW8SKsrdMV3dRjNOM60A8Ojs7MX36dLz++uux5W8DmALgehpXijx2YAHM/oGwpafADsyATJHz1e5MzvKkEhB45513MHnyZFy/rnTveJQSH/XBda4AE0SJkpUAEg8pNYHvvvtOpcRHjyrd6wAwFcAbrkOhALoeIdpnnQB/8LIh7+jowNSpU/HGG326J/+PCKEIopONAuhkWGgUCfhLQARQhFAEEYAsCeXFaUmNnWsUQOdCQoNIwH8CkgpLSiypcfRQRB6OyEMSpxoF0IlwMOlyIgw0QisBeSgyZcoUvP12n+7JazKPYBhuQD0qLb55LYCUjeInEC0ggcEISKn9ZcuWoa6uDvIlCQB5YVpSYnmBuvDmtQAWTi+jARTujOB4mrcE5IVpSYnlBero0zn5hE4+pSu0UQALxc/BXSLAHyaz0Whra0NtbS3kU7qoyUfFDVFxBbODD9B7GAKYaeZmOqmQIHFQEgiFgKTEjY2NqK+vR1dXl7gl5WUkJZYyW9ZbGAJoHRsHTEaAPzLJOBk+ysEwSFktSYmlzFZUYFUKrUrBVauNAmgVt4+DOXj1+IiRNt9HQAqsSqFVKbgaNSk9LaX3pQS/lea+AA54/fHCtDJDUg7CqKQEVvLDJSV+7bXXVOl9KcEPQDYhkX2JZTMm4819ATSOgAOQAAncTcD+z5hsviSbMMlmTABaAVQDkG05jTYKoFG87DwkAtZkwdpAbkQndle24ayursaGDRtiw2Rj9icAdJuytCABLFmEDUSPBA1AZZeFE5CU+KWXXlIbtMtG7QC+AFAJ4IwJ4wwJ4DD09vaYsJd9kgAJFEXA4q/unj17VEr8r3/9S7xtBjAOwGbdrhsSQECUnI0ESCADAYtCk8E6a6e0tLTgwQcfxObNSvdkRfVnALN1psQUQGvh5ECmCFAvoGoLmLiYTcUsab/Hjh3DH/7wh3hPYqmv9X8Atic9f6jjTDDLXRJfRzB19DEUPP6dBPwg4OfVYKPUvpMC6MekKt5KP6d18dxcsoAxvD8aRjdbumevo0AEsOTTqOTuuyRoXtni4Lyxvd1mIALo1bRz3lgHrwvnmdHA/ASK2HCdApg/buyBBEggBwEplNrQ0IAlS6Q6lmpSJ1DqBbbl6DbRqRTA+zBx/ZNo5vCgcAgUOOWlGoy87/f1118LTykZLfUB+5TQNGQKoGnC7J8ESktgcGVdt24dJkyYEL/iIvUApS6g1Ae01iiA1lBzIBLITqDARVp2owc4U6q+zJw5E4sWLYqPkDqAUg/wqvbBhuiQAmibOMcjAUcIFCGqUu1FUl6p/hLV/ZP6f1IHsJBGASwEu4FBi5jNBtxgl+ES2LhxI8aPHw+p+hLV+5O6f0oJi2oUwKLIc1yvCfD3Jnn4pKqLVHeRKi9RjQCp81eNYWgten9gCmDyOPJIEiCBlASkmktFRQW++EKqWqm6flLfT+r8OdEogE6EgUaQQHgEpIqLVHORqi5RPT+p66eU0JVGAXQlErSDBAIh0N3djdn/PxsLXlgQp7xSz0rq+UldP6eacwLIeytOzQ8aQwKpCJw7dw6VlZX4/PPP45RX6vdJHT8nKyQ7J4CpaOs6mKqri6RD/XgaVE/NlsBv3boVY8aMweXLl+V/no92d9vl0KS4zxQKoM7oeDx5dWIIuy8G+d743rp1C3PnzsVzzz2Hnh610NsKYCyAS67PBQqg6xGyaB8vbYuwAxnqwoULqKqqwqeffhqnvHMBzHc15b0XOwUwkImo3Q2qoXakIXR457TYvn27Er+ff/5ZXJP/I095d/jkp3EB5HXk03SgrWES0HsVSsor6a6kvVHKK3t0VEUi6BVC4wLoFQ0aSwJZCOjVlywWWDvn0qVL6kHHxx9/LGPKDb9nAUja6+RT3qHAUACHIuTd30t0NXoXG78N3rlzp3rF5fx5ecCrHnDIqm/bkF7dsw/HkMdbPIACaBE2hyIBHwlImrtgwQLMnj0bkv4C2Bnd71NK6HNzXwCNLWiMdezzfKDtpSdw93XR3NysPmf78MMP45RX++bkRSJ3XwD7pUPxKnLScOxyENi9e7cqZHD27FlxWD5jk3f7toTkvacCGFII6AsJpCNg+udfSlYtXLhQlbCS73qjAgZSu08pYUiNApgxmqYnYUazeNpQBBi4QQm1traqoqXvv/9+nPJK6apZUSmroeh693cKoHch89TgvMKT93xPsdk0+8svv1Tl6n/66ScZtjWq4LLJpg22x6IAaiOe5gpNc+xgBurqRxsEduQhAUl5ZYMi2ahIqjdHZeplh7YzHrqTyuSABJBikCryiQ8m16SoXCCV1oarV6+qrSnfe++92M1XoqrNN5P6bfQ4w+8QBiSARsNgtvO0s9asNYX17iYGN63SEaT9+/erlPeHH2RLXrUlZTWA9Tr69qUPCqAvkaKdJKCJgKS8S5YsQUNDA7q6uqTX/VHtPqWEZWrWBDDc39EyTRf66j6Bwa+0trY2TJo0CWvWrIldWQygIdqj1333NFtoTQA1283uSKCUBPIsJA4dOoSRI0fi+++/F3ZtAGoArC0lyMjpdAKY7IakxCjeDKXMbOk7CThBQFLe119/HdOnT8eNGzfEpkMA5CnvSScMLNCIdAKYzNABBDDPb1eygXkUCbhNwP410N7ejsmTJ2PVqlUxmqUApgNQSlj2ZlEAy46a/pOAXQLffPONSnmPHz8uA18H8BCAPiVEsozOrtGWR6MAWgbO4UjABoEVK1Zg2rRp6OzslOGORimvUkK2/xIohQDaTzw4xXwm4PN8+eWXXzB16lS8+eabcQhWAHgEQIfPMTFle0EC6PMUMxUK9ksC+QgcO3ZMpbzffvutdCSCNwXAW/l6DfvsggQwbKhOeefCb40LNjgVFP3GrFy5ElOmTIGsAAEci1Je+W+2QQhQADk9/CRAUVVx6+joQF1dHZYvXx7HUVZ8svJzNOW1+OQlwVAUQD8vf1pNAmhqalIp75EjR+KUV+71yT0/toQEKIAJQfEwEnCJwLvvvova2lpcvy5vt+BElPIqJQy3JVjSpXSeApgSGA8ngSIJyJcc9fX1aGxsjM1YDWBS9J5fkaZ5ObYxAYyqynoJhUa7ReCBBx7Ar371K7eM0m1NgnuaJ0+eVCnvwYMHZXT5kqMeQJ8S6japDP0ZE8Bk8PQvaZONy6OsENAUXrnXNXz4cCsmuzrI2rVrUVNTA6nmEn3DK9/yyje9JW75J5gJAVQbCrCRgAYCvwHwP2UWQKnXN2PGDLz22msxTqneIlVclBKy5SNgQgDzWcSzvSCQ/7c3kZtNAIaXVQB//PFHlfJK5eaoXp/U7ZP6fWyaCFAANYFkN0YIeCaACW7kJcS0fv16VFdXQ/bsACCVmmVfXqWEbPoIUAD1sWRP+gk4JID6xG0wTDdv3sSTTz6Jl19+OT5M9uiQvTqUErLpJUAB1Muz4N4sJab2vHRIAAdyWp8wypsTFRUV2Lt3b5zyPgFAdmljM0TAogAGd3EaCgm7vYOABwKoJ16bNm3CuHHj0Noq+5Gr/Xgl5VVKyGaOgEUBNOeEzZ4HknHKu5EoBC+AshH5008/jRdffDHeRmITgHEAlBLma/Gs5OwciCMFMN8M49lmCQQtgGfPnkVlZSV27dolFLsB/AnAXwD0mMXK3mMCFEDOBZcJRAJ4HMOH/95lO1PbtmXLFowdOxbNzc1y7lkAlQCUErLZI0ABtMeaI6UnENwKsLu7G8888wzmz58fp7xbAIwFoJSQzS4BCqBd3hwtHQG7AqjvgW6/Xp4/fx6jR4/GZ599Fqe8cwC8wJQ33aTQeTQFUCdN9qWbgB4BTCFsKQ5N5eu2bdswZswYXLx4Uc47H6W8O1N1woO1E6AAakdquMNyPdDTI4CGQzJY97du3cK8efPUf3p61LONbQCqAFwq0CwOHRGgAHIqJCRQiPJ6LYCy2quqqsInn3wijEX95gJ4lilvwiln4TAKoAXIHCIzAW8FcMeOHep+34ULF8T5n6NV3/bMJHiiEQIUQCNY2akmAnYEUOONP0lzn3/+ecyZMweS/gLYEd3vExFkc4wABbDggBSSWBbsc4rh7QhgCoMGO/Ty5cvq3b6PPvooTnnnR2mvvOTM5iCBYbwAHYwKTYoJaBNAjYu8fqMjX3NIIYNz587J3+WdPnnQsZWhdJsAV4Bux6fs1mkTQFMgJeWV73jle155yTn6mkO+6pCvO9gcJ0ABLDRAXH8Pgd9pAWxpaVEVXD744IM45ZXveOV7Xqa8hV5XyQenACZnxSPtE3BWAPfs2aNS3jNnpHKVqtwin7Ntto+II+YhQAHMQ4/nmibgnAD29vaqas1StVlKWUU1+6R2n1JCI42JghGs0ikF0BhadqyBgFMCeOXKFbVPx4YNG2LXXgIwK9qwSIO77MI2gbsEkD80SfCTUhJKmo5xRgC/+uortUPb6dOnxTXZn0OKlm7U5Ce7KYgAV4AFgfd5WIs/AYULoKS8ixcvxuOPPw7ZsAjAvqhcvVJCNr8JUAD9jl/o1hcqgNeuXcPEiROxdq3sRa7aqwBmMOUNZ9pRAMOJZYieFCaABw4cUCnvqVOn4pS3BsC6ECGX2ScKYJmj777vGgQw3TcgkvI2Njaivr4eXV1dQuhAlPKedB8XLUxLgAKYlhiPt0lAgwAmN7e9vR21tbVYvXp1fFIjgHoAN5L3wiNvv1wiPzzuNz0C6I+/7keEFt5JwJoAHj58WKW8J06ckPHbADwEoE8JGZYwCegRwDDZ0KsEBAz/9hkXQEl5ly9fjrq6OnR2dsri5Qh6MQKAUkK2sAlQAMOOr+/eGRXA69ev4+GHH8bKlStjTssAPMKU1/dpk9x+CmByVjzSPgFjAvjtt99ixIgR+O6778Sr6wCmAHjbvoscsUgCQQug4fSsyLiVZWwjAvjmm2+qlV9HR4dwPAqolPd4WaDSz/8SCFoAGWjvCWgVQBG8adOm4W9/+1sM5g0AUwEoJWQrHwEKYPli7pPH2gTw+PHjKuU9elQWfErwRPhEANlKTIAC2Bd8JswOXgdaBPCdd97B5MmTIQ89olRXUl6lhGzlJkABLHf8Xfc+lwDKay2PPvooli5dGvu5Knq/Tykh2xAESrAmsCuAJQDKi0orgcwC+P3336uUV15wjl5rmQ6gTwm1WsnOvCVgVwCdwUQldiYUgxuSSQDXrFmjqrjIp23RC81SsfmQJz7TTIsESiqAFglzqDwEUgmgFC9oeOwx/HXJknjMNQAmRZ+25bGD5wZKgAIYaGADcSuxAErZqlGjRuHrr7+OU94GAH1KGAiPMN0oMCGjAIY5pULxKpEArlu3DhMmTIAUMAXwQ/Ris5SxYiOBQQlQADlBXCYwqABKifqZM2di0aJFsQ9SsFQKl8qeHWwkMCQBCuCQiHhAgQQGFEDZnEhS3n37ZIsOyGYdUqpeStazkUBiAhTAxKh4YAEE+hXAjRs3Yvz48ZBtKgHI5kTylFcpodZW4L0prX6wswEJUAA5OVwmcJcAykbkTz31FBYuXAip4xdtS1kNoNVlJ2ibuwQogO7GhpYBfQL461//GhUVFfjiiy+ESzeAJwDIxuRsJJCZAAUwMzp3Twwoc1MC+MpmpaxZAAADwklEQVQrr2DevHloaWkR6GcAVAJQSshGAnkIUADz0OO5pgkoAbxjkM0AxgFoNj0w+y8HAQpgyjgHtLpK6Xkhh8cCKCnvbAB/BtBTiCUcNEgCFMAgwxqMUyKA/xulvDuD8YqOOEOAAuhMKGhIPwT+CmAugEukQwImCFAATVBlnyRAAl4Q6BNA3tsqNl7kb5g/ARsG7Gf3XAH6GbcSWE3FKkGQC3eRAlh4CGgACZBAUQQogInJc0WSGBUPJAFPCFAAPQkUzSQBEtBPgAKon6m7PXIR625saFkhBCiAhWDnoCRAAi4QoAC6EAXaQAIkoJlAsnSHAqgZ+1DdJQvLUL3w7yRAAjoIUAB1UGQfJEACXhLwXwC5pPJy4tFoErBHYGCR8F8Ah6JIgRyKkMW/BxaMwNyxOBGcGSp8AXQGNQ1JQoCakoQSj9FFgAKoiyT7IYGMBCj6GcFpOI0CqAEiuyABEvCTQDACyF9RPycgrXaBQHmvnmAE0IVpRBtIgAT8IkAB9CtetJYESEAjAQqgRpjsigRcJlDeRHfgqFAAXZ2xnK2uRoZ2BUSAAhhQMOlKHgL8xQHKx4ACmOea4bkkQAJeE6AAeh0+Gk8CZSeQb9VKASz7/KH/JFBiAhTAEgefrpPA3QTyraZ8pEkB9DFqtJkESEALAQqgFowBdlK+xUCAQaRLQxGgAA5FKNHfqRaJMPEgEnCMAAXQsYDQnIAI8HfR+WBSAJ0PEQ0kgaQEqLhJScXHWRZABihtgHg8CeQiwEtuUHyWBTBXKHkyCZCAAwRC0lQKoAMTiiaQQPAEHFVNCmDwM48OkgAJDETAuAA6KvycEUPeGek1w4gTwgxX9pqJgHEBzGQVTyIBEiCBpARy/KhSAJNC5nEkYItAjgvalonaxinYVwqgtkiG1lHBMzM0nPTHSQIUQCfDQqNIgARsEKAA2qDMMUiABJwkQAFMEZbyJYXl8zjFdOChARCgAAYQRBdcoFS6EAXakJYABTAtMR6vjwBVUx9L9pSJAAUwEzaeRAIkEAIBCmAIUaQPJEACmQhQADNh40kkQAIhEEgvgLxv417cdcVEVz/uEaJFvhIwPCfTC6CvIGm3EQKG56cRm93tlDRtx4YCaJs4xyMBEnCGAAXQmVDQEBIgAdsEKIC2iQ8xHpMgxwJCc4ImQAEMOrx0jgRIYDACFEDODxIggdISoACWNvT6HGfaro8le7JLgAJolzdH85EAFd7HqCWymQKYCBMPIgESCJEABTDEqNInEiCBRAQogIkw8SASIIEQCfwHOW/i113bk+IAAAAASUVORK5CYII="></image>
    </defs>
  </svg>
);

export const SwapPreview = () => {
  return (


    <div className="grid h-screen grid-rows-3">
      <div></div>
      <div className="row-span-2">
        <div className="flex flex-row justify-between">
          <div style={styles.amount}>
            <div style={styles.container}>10 USDT</div>
          </div>
          <IconComponent />
          <div style={styles.amount}>
            <div style={styles.container}>0.00388 ETH</div>
          </div>
        </div>
      </div>
    </div>


  );
}
