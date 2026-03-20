import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { GetPaymentTypes } from "../services/paymentTypesService";
import { CreateBill } from "../services/billsService";
import { GetCategories } from "../services/categoryService";
import { CreateIncome } from "../services/incomeService";
import { useNavigate, Link } from 'react-router-dom';
import { categoryIconMap } from "../Icons/categoryIcons";

const frequencies = ["Weekly", "Monthly", "Quarterly", "Yearly"];

const AddBillScreen = () => {

  const [mode, setMode] = useState<"bill" | "income">("bill");

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const [paymentTypes, setPaymentTypes] = useState<any[]>([]);
  const [paymentTypeId, setPaymentTypeId] = useState<number>();

  const [categories, setCategories] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState<number>();

  const [showAllCategories, setShowAllCategories] = useState(false);

  const [frequency, setFrequency] = useState("Monthly");

  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const navigate = useNavigate();

  const [dayOfMonth, setDayOfMonth] = useState(1);


  useEffect(() => {
    loadPaymentTypes();
    loadCategories();
  }, []);



  const loadPaymentTypes = async () => {
    const res = await GetPaymentTypes();

    if (res) {
      setPaymentTypes(res);
      setPaymentTypeId(res[0]?.PaymentTypeId);
    }
  };



  const loadCategories = async () => {
    const res = await GetCategories();

    if (res) {
      setCategories(res);
      setCategoryId(res[0]?.categoryId);
    }
  };



  const handleSubmit = async () => {

    if (!name) {
      toast.error("Name required");
      return;
    }

    if (!amount) {
      toast.error("Amount required");
      return;
    }


    // =====================
    // BILL MODE
    // =====================

    if (mode === "bill") {

      if (!categoryId) {
        toast.error("Select category");
        return;
      }

      if (!paymentTypeId) {
        toast.error("Select payment type");
        return;
      }

      if (frequency === "Monthly" && !dayOfMonth) {
        toast.error("Day required");
        return;
      }

      const dto = {
        name,
        amount: parseFloat(amount),
        categoryId,
        paymentTypeId,
        frequency,
        startDate,
        dayOfMonth,
      };

      const res = await CreateBill(dto);

      if (res.success) {
        toast.success("Bill saved");
        setName("");
        setAmount("");
      } else {
        toast.error(res.message);
      }

    }


    // =====================
    // INCOME MODE
    // =====================

    else {

      const dto = {
        name,
        amount: parseFloat(amount),
        incomeDate: startDate,
      };

      const res = await CreateIncome(dto);

      if (res.success) {
        toast.success("Income saved");
        setName("");
        setAmount("");
      } else {
        toast.error(res.message);
      }

    }

  };



  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, 8);



  return (
    <div className="px-4 pt-6">
      <div className="flex items-center justify-between mb-6">

          <h1 className="text-2xl font-heading font-bold">
            Add
          </h1>

          <button
            onClick={() => navigate("/viewBills")}
            className="text-sm text-primary"
          >
            View Bills
          </button>

        </div>

      {/* TOGGLE */}

      <div className="flex bg-muted rounded-xl p-1 mb-6">

        <button
          onClick={() => setMode("bill")}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold ${
            mode === "bill"
              ? "bg-card shadow-card"
              : "text-muted-foreground"
          }`}
        >
          Bill
        </button>

        <button
          onClick={() => setMode("income")}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold ${
            mode === "income"
              ? "bg-card shadow-card"
              : "text-muted-foreground"
          }`}
        >
          Income
        </button>

      </div>



      {/* NAME */}

      <div className="mb-5">
        <label className="text-sm font-medium mb-1.5 block">
          Name
        </label>

        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          className="h-11 rounded-xl"
        />
      </div>



      {/* AMOUNT */}

      <div className="mb-5">
        <label className="text-sm font-medium mb-1.5 block">
          Amount
        </label>

        <Input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="h-11 rounded-xl"
        />
      </div>



      {/* BILL ONLY UI */}

      {mode === "bill" && (

        <>

          {/* CATEGORY */}

          <div className="mb-5">

            <label className="text-sm font-medium mb-2 block">
              Category
            </label>

            <div className="grid grid-cols-4 gap-2">

              {visibleCategories.map(c => {

                const Icon =
                  categoryIconMap[c.icon] ||
                  categoryIconMap["Wallet"];

                const isActive =
                  categoryId === c.categoryId;

                return (

                  <button
                    key={c.categoryId}
                    onClick={() =>
                      setCategoryId(c.categoryId)
                    }
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl text-xs
                    ${
                      isActive
                        ? "bg-primary text-white"
                        : "bg-card text-muted-foreground"
                    }`}
                  >

                    <Icon size={18} />

                    {c.name}

                  </button>

                );

              })}

            </div>

            {categories.length > 8 && (

              <button
                onClick={() =>
                  setShowAllCategories(!showAllCategories)
                }
                className="text-xs mt-2"
              >
                {showAllCategories ? "Less" : "More"}
              </button>

            )}

          </div>



          {/* PAYMENT */}

          <div className="mb-5">

            <label className="text-sm font-medium mb-2 block">
              Payment Method
            </label>

            <div className="flex gap-2 flex-wrap">

              {paymentTypes.map(p => (

                <button
                  key={p.paymentTypeId}
                  onClick={() =>
                    setPaymentTypeId(
                      p.paymentTypeId
                    )
                  }
                  className={`text-xs px-3 py-2 rounded-full
                  ${
                    paymentTypeId ===
                    p.paymentTypeId
                      ? "bg-primary text-white"
                      : "bg-muted"
                  }`}
                >
                  {p.name}
                </button>

              ))}

            </div>

          </div>



          {/* FREQUENCY */}

          <div className="mb-5">

            <label className="text-sm font-medium mb-2 block">
              Frequency
            </label>

            <div className="flex gap-2">

              {frequencies.map(f => (

                <button
                  key={f}
                  onClick={() =>
                    setFrequency(f)
                  }
                  className={`text-xs px-3 py-2 rounded-full
                  ${
                    frequency === f
                      ? "bg-primary text-white"
                      : "bg-muted"
                  }`}
                >
                  {f}
                </button>

              ))}

            </div>

          </div>



          {/* DAY */}

          {frequency === "Monthly" && (

            <div className="mb-5">

              <label className="text-sm font-medium mb-1.5 block">
                Day of Month
              </label>

              <Input
                type="number"
                value={dayOfMonth}
                onChange={e =>
                  setDayOfMonth(
                    Number(e.target.value)
                  )
                }
              />

            </div>

          )}

        </>

      )}



      {/* DATE */}

      <div className="mb-6">

        <label className="text-sm font-medium mb-1.5 block">
          Date
        </label>

        <Input
          type="date"
          value={startDate}
          onChange={e =>
            setStartDate(e.target.value)
          }
        />

      </div>



      <Button
        onClick={handleSubmit}
        variant="gradient"
        size="lg"
        className="w-full rounded-xl"
      >
        Save
      </Button>

    </div>
  );
};

export default AddBillScreen;