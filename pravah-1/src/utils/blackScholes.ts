import { jStat } from 'jstat';

export interface GreeksResult {
  delta: number;
  gamma: number;
  theta: number;
  vega: number;
  rho: number;
}

export class BlackScholesCalculator {
  constructor(
    private r: number,     // Risk-free rate
    private S: number,     // Current stock price
    private K: number,     // Strike price
    private T: number,     // Time to maturity in years
    private sigma: number  // Volatility
  ) {}

  private calculateDs(): [number, number] {
    const d1 = (Math.log(this.S / this.K) + (this.r + 0.5 * Math.pow(this.sigma, 2)) * this.T) / 
               (this.sigma * Math.sqrt(this.T));
    const d2 = d1 - this.sigma * Math.sqrt(this.T);
    return [d1, d2];
  }

  public calculatePrice(type: 'Call' | 'Put'): number {
    const [d1, d2] = this.calculateDs();
    
    if (type === 'Call') {
      return this.S * jStat.normal.cdf(d1, 0, 1) - 
             this.K * Math.exp(-this.r * this.T) * jStat.normal.cdf(d2, 0, 1);
    } else {
      return this.K * Math.exp(-this.r * this.T) * jStat.normal.cdf(-d2, 0, 1) - 
             this.S * jStat.normal.cdf(-d1, 0, 1);
    }
  }

  public calculateGreeks(type: 'Call' | 'Put'): GreeksResult {
    const [d1, d2] = this.calculateDs();
    
    if (type === 'Call') {
      const delta = jStat.normal.cdf(d1, 0, 1);
      const gamma = jStat.normal.pdf(d1, 0, 1) / (this.S * this.sigma * Math.sqrt(this.T));
      const vega = this.S * jStat.normal.pdf(d1, 0, 1) * Math.sqrt(this.T);
      const theta = (-this.S * jStat.normal.pdf(d1, 0, 1) * this.sigma / (2 * Math.sqrt(this.T))) -
                    (this.r * this.K * Math.exp(-this.r * this.T) * jStat.normal.cdf(d2, 0, 1));
      const rho = this.K * this.T * Math.exp(-this.r * this.T) * jStat.normal.cdf(d2, 0, 1);

      return {
        delta: Number(delta.toFixed(3)),
        gamma: Number(gamma.toFixed(3)),
        theta: Number((theta / 365).toFixed(4)),
        vega: Number((vega * 0.01).toFixed(3)),
        rho: Number((rho * 0.01).toFixed(3))
      };
    } else {
      const delta = -jStat.normal.cdf(-d1, 0, 1);
      const gamma = jStat.normal.pdf(d1, 0, 1) / (this.S * this.sigma * Math.sqrt(this.T));
      const vega = this.S * jStat.normal.pdf(d1, 0, 1) * Math.sqrt(this.T);
      const theta = (-this.S * jStat.normal.pdf(d1, 0, 1) * this.sigma / (2 * Math.sqrt(this.T))) +
                    (this.r * this.K * Math.exp(-this.r * this.T) * jStat.normal.cdf(-d2, 0, 1));
      const rho = -this.K * this.T * Math.exp(-this.r * this.T) * jStat.normal.cdf(-d2, 0, 1);

      return {
        delta: Number(delta.toFixed(3)),
        gamma: Number(gamma.toFixed(3)),
        theta: Number((theta / 365).toFixed(4)),
        vega: Number((vega * 0.01).toFixed(3)),
        rho: Number((rho * 0.01).toFixed(3))
      };
    }
  }
}