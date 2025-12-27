"use client"

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, DollarSign, TrendingUp, FileText, Info } from "lucide-react";
import { formatLKRPrice } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Tools() {
  return (
    <main className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Vehicle Tools & Calculators
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Calculate import costs, loan payments, and financing options for your dream vehicle
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ImportCostCalculator />
          <LoanCalculator />
        </div>
      </div>
    </main>
  );
}

// Vehicle Import Cost Calculator Component
function ImportCostCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState("");
  const [currency, setCurrency] = useState<"JPY" | "USD">("USD");
  const [exchangeRate, setExchangeRate] = useState(currency === "USD" ? "300" : "2.0");
  const [engineCapacity, setEngineCapacity] = useState("");
  const [vehicleAge, setVehicleAge] = useState("0");
  const [freightCharges, setFreightCharges] = useState("");

  const handleCurrencyChange = (v: string) => {
    setCurrency(v as "JPY" | "USD");
    setExchangeRate(v === "USD" ? "300" : "2.0");
  };

  // Calculate import costs based on Sri Lanka regulations
  const calculateImportCosts = () => {
    if (!vehiclePrice || !engineCapacity) return null;

    const price = parseFloat(vehiclePrice);
    const rate = parseFloat(exchangeRate);
    const capacity = parseFloat(engineCapacity);
    const age = parseInt(vehicleAge);
    const freight = parseFloat(freightCharges) || 0;

    if (isNaN(price) || isNaN(rate) || isNaN(capacity)) return null;

    // Convert to LKR
    const priceLKR = price * rate;

    // CIF Value (Cost, Insurance, Freight) - original value
    const cifValue = priceLKR + freight;

    // Import Duty Calculation (based on engine capacity and age)
    // Sri Lanka duty structure: Standard rate 92% for most vehicles
    // Age depreciation: 0-1 year: 0%, 1-2 years: 5%, 2-3 years: 10%, 3-4 years: 15%, 4-5 years: 20%, 5+ years: 25%
    
    // Age depreciation (applied to CIF value for duty calculation)
    const ageDepreciation = Math.min(age * 0.05, 0.25); // Max 25% depreciation for 5+ years
    const depreciatedCIF = cifValue * (1 - ageDepreciation);
    
    // Import duty rate (92% standard rate)
    const dutyRate = 0.92;
    
    // Import duty calculated on depreciated CIF value
    const importDuty = depreciatedCIF * dutyRate;

    // CESS (5% on CIF value + duty)
    const cess = (cifValue + importDuty) * 0.05;

    // VAT (18% on CIF + duty + cess)
    const vat = (cifValue + importDuty + cess) * 0.18;

    // Port Charges (fixed + variable)
    const portCharges = 50000 + (cifValue * 0.01); // Base 50,000 + 1% of CIF

    // Insurance (1.5% of CIF)
    const insurance = cifValue * 0.015;

    // Other charges (documentation, handling, etc.)
    const otherCharges = 25000;

    const totalCost = cifValue + importDuty + cess + vat + portCharges + insurance + otherCharges;

    return {
      priceLKR,
      freight,
      cifValue,
      importDuty,
      cess,
      vat,
      portCharges,
      insurance,
      otherCharges,
      totalCost,
      ageDepreciation: ageDepreciation * 100,
    };
  };

  const results = calculateImportCosts();

  return (
    <Card className="border-silver/20 bg-card/30 backdrop-blur-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-silver-light/10">
          <Calculator className="h-6 w-6 text-silver-light" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Import Cost Calculator
          </h2>
          <p className="text-sm text-muted-foreground">Calculate total import costs from Japan/USA</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="currency" className="text-sm font-medium text-foreground mb-2 block">
              Currency
            </Label>
            <Select value={currency} onValueChange={handleCurrencyChange}>
              <SelectTrigger className="bg-background/50 border-silver/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    USD
                  </div>
                </SelectItem>
                <SelectItem value="JPY">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">¥</span>
                    JPY
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="price" className="text-sm font-medium text-foreground mb-2 block">
              Vehicle Price ({currency})
            </Label>
            <Input
              id="price"
              type="number"
              placeholder={currency === "USD" ? "e.g., 50000" : "e.g., 5000000"}
              value={vehiclePrice}
              onChange={(e) => setVehiclePrice(e.target.value)}
              className="bg-background/50 border-silver/30"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="exchangeRate" className="text-sm font-medium text-foreground mb-2 block">
            Exchange Rate (1 {currency} = LKR)
          </Label>
          <Input
            id="exchangeRate"
            type="number"
            step="0.01"
            placeholder={currency === "USD" ? "e.g., 300" : "e.g., 2.0"}
            value={exchangeRate}
            onChange={(e) => setExchangeRate(e.target.value)}
            className="bg-background/50 border-silver/30"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="engineCapacity" className="text-sm font-medium text-foreground mb-2 block">
              Engine Capacity (CC)
            </Label>
            <Input
              id="engineCapacity"
              type="number"
              placeholder="e.g., 2000"
              value={engineCapacity}
              onChange={(e) => setEngineCapacity(e.target.value)}
              className="bg-background/50 border-silver/30"
            />
          </div>

          <div>
            <Label htmlFor="vehicleAge" className="text-sm font-medium text-foreground mb-2 block">
              Vehicle Age (Years)
            </Label>
            <Select value={vehicleAge} onValueChange={setVehicleAge}>
              <SelectTrigger className="bg-background/50 border-silver/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0-1 Year</SelectItem>
                <SelectItem value="1">1-2 Years</SelectItem>
                <SelectItem value="2">2-3 Years</SelectItem>
                <SelectItem value="3">3-4 Years</SelectItem>
                <SelectItem value="4">4-5 Years</SelectItem>
                <SelectItem value="5">5+ Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="freight" className="text-sm font-medium text-foreground mb-2 block">
            Freight Charges (LKR) <span className="text-muted-foreground text-xs">(Optional)</span>
          </Label>
          <Input
            id="freight"
            type="number"
            placeholder="e.g., 200000"
            value={freightCharges}
            onChange={(e) => setFreightCharges(e.target.value)}
            className="bg-background/50 border-silver/30"
          />
        </div>

        {results && (
          <div className="mt-6 space-y-4 pt-6 border-t border-silver/20">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Info className="h-4 w-4" />
              <span>Cost Breakdown</span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Vehicle Price (LKR)</span>
                <span className="font-medium">{formatLKRPrice(results.priceLKR)}</span>
              </div>
              {results.freight > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Freight Charges</span>
                  <span className="font-medium">{formatLKRPrice(results.freight)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">CIF Value (Price + Freight)</span>
                <span className="font-medium">{formatLKRPrice(results.cifValue)}</span>
              </div>
              {results.ageDepreciation > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Age Depreciation ({results.ageDepreciation.toFixed(0)}%)</span>
                  <span className="font-medium text-amber-200">-{formatLKRPrice(results.cifValue * (results.ageDepreciation / 100))}</span>
                </div>
              )}
              {results.ageDepreciation > 0 && (
                <div className="flex justify-between text-sm text-muted-foreground italic">
                  <span>Depreciated CIF (for duty calculation)</span>
                  <span>{formatLKRPrice(results.cifValue * (1 - results.ageDepreciation / 100))}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Import Duty (92%)</span>
                <span className="font-medium">{formatLKRPrice(results.importDuty)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">CESS (5%)</span>
                <span className="font-medium">{formatLKRPrice(results.cess)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">VAT (18%)</span>
                <span className="font-medium">{formatLKRPrice(results.vat)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Port Charges</span>
                <span className="font-medium">{formatLKRPrice(results.portCharges)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Insurance (1.5%)</span>
                <span className="font-medium">{formatLKRPrice(results.insurance)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Other Charges</span>
                <span className="font-medium">{formatLKRPrice(results.otherCharges)}</span>
              </div>
              <div className="pt-3 border-t border-silver/20 flex justify-between">
                <span className="font-semibold text-foreground">Total Import Cost</span>
                <span className="font-bold text-lg text-silver-light">{formatLKRPrice(results.totalCost)}</span>
              </div>
            </div>

            <Alert className="mt-4 bg-silver-light/5 border-silver/20">
              <AlertDescription className="text-xs text-muted-foreground">
                <strong>Note:</strong> These calculations are estimates. Actual costs may vary based on current regulations, 
                vehicle specifications, and other factors. Please consult with a customs agent for precise calculations.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </Card>
  );
}

// Loan/Leasing Calculator Component
function LoanCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [downPaymentPercent, setDownPaymentPercent] = useState("20");
  const [interestRate, setInterestRate] = useState("12");
  const [loanTerm, setLoanTerm] = useState("5");
  const [loanType, setLoanType] = useState<"loan" | "leasing">("loan");

  const handleDownPaymentPercentChange = (v: string) => {
    setDownPaymentPercent(v);
    if (vehiclePrice) {
      setDownPayment((parseFloat(vehiclePrice) * parseFloat(v) / 100).toString());
    }
  };

  const handleDownPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDownPayment(e.target.value);
    if (vehiclePrice && e.target.value) {
      const percent = (parseFloat(e.target.value) / parseFloat(vehiclePrice)) * 100;
      setDownPaymentPercent(percent.toFixed(0));
    }
  };

  const calculateLoan = () => {
    if (!vehiclePrice) return null;

    const price = parseFloat(vehiclePrice);
    const downPercent = parseFloat(downPaymentPercent);
    const down = parseFloat(downPayment) || (price * downPercent / 100);
    const rate = parseFloat(interestRate) / 100;
    const term = parseInt(loanTerm);

    if (isNaN(price) || isNaN(down) || isNaN(rate) || isNaN(term)) return null;

    const loanAmount = price - down;
    const monthlyRate = rate / 12;
    const numPayments = term * 12;

    // Calculate monthly payment using amortization formula
    let monthlyPayment = 0;
    if (monthlyRate > 0) {
      monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                      (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else {
      monthlyPayment = loanAmount / numPayments;
    }

    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - loanAmount;
    const totalCost = price + totalInterest;

    return {
      vehiclePrice: price,
      downPayment: down,
      loanAmount,
      monthlyPayment,
      totalPayment,
      totalInterest,
      totalCost,
      numPayments,
    };
  };

  const results = calculateLoan();

  return (
    <Card className="border-silver/20 bg-card/30 backdrop-blur-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-silver-light/10">
          <TrendingUp className="h-6 w-6 text-silver-light" />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-foreground">
            Loan & Leasing Calculator
          </h2>
          <p className="text-sm text-muted-foreground">Calculate monthly payments and total cost</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="loanType" className="text-sm font-medium text-foreground mb-2 block">
            Financing Type
          </Label>
          <Select value={loanType} onValueChange={(v) => setLoanType(v as "loan" | "leasing")}>
            <SelectTrigger className="bg-background/50 border-silver/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="loan">Vehicle Loan</SelectItem>
              <SelectItem value="leasing">Leasing/Speed Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="vehiclePriceLoan" className="text-sm font-medium text-foreground mb-2 block">
            Vehicle Price (LKR)
          </Label>
          <Input
            id="vehiclePriceLoan"
            type="number"
            placeholder="e.g., 10000000"
            value={vehiclePrice}
            onChange={(e) => setVehiclePrice(e.target.value)}
            className="bg-background/50 border-silver/30"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="downPaymentPercent" className="text-sm font-medium text-foreground mb-2 block">
              Down Payment (%)
            </Label>
            <Select value={downPaymentPercent} onValueChange={handleDownPaymentPercentChange}>
              <SelectTrigger className="bg-background/50 border-silver/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 8 }, (_, i) => {
                  const percent = 10 + (i * 10);
                  return (
                    <SelectItem key={percent} value={percent.toString()}>
                      {percent}%
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="downPayment" className="text-sm font-medium text-foreground mb-2 block">
              Down Payment (LKR)
            </Label>
            <Input
              id="downPayment"
              type="number"
              placeholder="Custom amount"
              value={downPayment}
              onChange={handleDownPaymentChange}
              className="bg-background/50 border-silver/30"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="interestRate" className="text-sm font-medium text-foreground mb-2 block">
              Interest Rate (% per year)
            </Label>
            <Input
              id="interestRate"
              type="number"
              step="0.1"
              placeholder="e.g., 12"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="bg-background/50 border-silver/30"
            />
          </div>

          <div>
            <Label htmlFor="loanTerm" className="text-sm font-medium text-foreground mb-2 block">
              Loan Term (Years)
            </Label>
            <Select value={loanTerm} onValueChange={setLoanTerm}>
              <SelectTrigger className="bg-background/50 border-silver/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Year</SelectItem>
                <SelectItem value="2">2 Years</SelectItem>
                <SelectItem value="3">3 Years</SelectItem>
                <SelectItem value="4">4 Years</SelectItem>
                <SelectItem value="5">5 Years</SelectItem>
                <SelectItem value="6">6 Years</SelectItem>
                <SelectItem value="7">7 Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {results && (
          <div className="mt-6 space-y-4 pt-6 border-t border-silver/20">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <FileText className="h-4 w-4" />
              <span>Payment Breakdown</span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Vehicle Price</span>
                <span className="font-medium">{formatLKRPrice(results.vehiclePrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Down Payment</span>
                <span className="font-medium">{formatLKRPrice(results.downPayment)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Loan Amount</span>
                <span className="font-medium">{formatLKRPrice(results.loanAmount)}</span>
              </div>
              <div className="pt-3 border-t border-silver/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-foreground">Monthly Payment</span>
                  <span className="font-bold text-xl text-silver-light">
                    {formatLKRPrice(results.monthlyPayment)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {results.numPayments} payments × {formatLKRPrice(results.monthlyPayment, { showCurrency: false })}
                </p>
              </div>
              <div className="flex justify-between text-sm pt-2">
                <span className="text-muted-foreground">Total Interest</span>
                <span className="font-medium text-amber-200">{formatLKRPrice(results.totalInterest)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Amount Paid</span>
                <span className="font-medium">{formatLKRPrice(results.totalPayment)}</span>
              </div>
              <div className="pt-3 border-t border-silver/20 flex justify-between">
                <span className="font-semibold text-foreground">Total Cost of Vehicle</span>
                <span className="font-bold text-lg text-silver-light">{formatLKRPrice(results.totalCost)}</span>
              </div>
            </div>

            <Alert className="mt-4 bg-silver-light/5 border-silver/20">
              <AlertDescription className="text-xs text-muted-foreground">
                <strong>Note:</strong> Interest rates and terms may vary by financial institution. 
                This calculator provides estimates. Actual rates and terms are subject to credit approval 
                and may include additional fees.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </Card>
  );
}



