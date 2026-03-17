import { useEffect, useState } from "react"
import { useApp } from "@/context/AppContext"

import {
  Receipt,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

import {
  GetMonthlyOccurrences,
  PayOccurrence,
} from "@/services/occurrenceService"

import {
  OccurrenceSummary,
  Occurrence,
} from "@/models/occurrenceTypes"



const BillsScreen = () => {

  const { currency } = useApp()

  const today = new Date()

  const [year, setYear] =
    useState(today.getFullYear())

  const [month, setMonth] =
    useState(today.getMonth() + 1)

  const [data, setData] =
    useState<OccurrenceSummary | null>(null)



  useEffect(() => {

    load()

  }, [month, year])



  async function load() {

    const res =
      await GetMonthlyOccurrences(
        year,
        month
      )

    if (res.success)
      setData(res.data)

  }



  function nextMonth() {

    if (month === 12) {
      setMonth(1)
      setYear(y => y + 1)
    } else {
      setMonth(m => m + 1)
    }
  }



  function prevMonth() {

    if (month === 1) {
      setMonth(12)
      setYear(y => y - 1)
    } else {
      setMonth(m => m - 1)
    }
  }



  async function pay(
    occurrenceId: number
  ) {

    await PayOccurrence(
      occurrenceId
    )

    load()
  }



  const monthName =
    new Date(
      year,
      month - 1
    ).toLocaleString(
      "en-IN",
      {
        month: "long",
        year: "numeric",
      }
    )



  function getColor(
    o: Occurrence
  ) {

    if (o.isPaid)
      return "text-green-600"

    const due =
      new Date(o.dueDate)

    const now =
      new Date()

    if (due < now)
      return "text-red-500"

    return "text-yellow-500"
  }



  function renderList(
    title: string,
    list: Occurrence[]
  ) {

    if (!list?.length)
      return null

    return (

      <div className="mb-6">

        <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
          <Receipt size={16} />
          {title}
        </h3>


        <div className="space-y-2">

          {list.map(o => (

            <div
              key={o.occurrenceId}
              className="bg-card rounded-xl p-4 shadow-card flex items-center justify-between"
            >

              <div>

                <p
                  className={`text-sm font-semibold ${getColor(
                    o
                  )}`}
                >
                  {o.name}
                </p>

                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <CalendarDays size={12} />

                  {new Date(
                    o.dueDate
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                    }
                  )}
                </p>

              </div>



              <div className="text-right">

                <p className="text-sm font-bold text-foreground">
                  {currency}
                  {o.amount.toLocaleString()}
                </p>


                {!o.isPaid && (

                  <button
                    onClick={() =>
                      pay(
                        o.occurrenceId
                      )
                    }
                    className="text-xs text-primary mt-1"
                  >
                    Pay
                  </button>

                )}

              </div>

            </div>

          ))}

        </div>

      </div>
    )
  }



  return (

    <div className="px-4 pt-6">

      {/* Header */}

      <div className="flex items-center justify-between mb-4">

        <button onClick={prevMonth}>
          <ChevronLeft />
        </button>

        <h1 className="text-xl font-bold">
          {monthName}
        </h1>

        <button onClick={nextMonth}>
          <ChevronRight />
        </button>

      </div>



      {/* Summary */}

      {data && (

        <div className="gradient-primary rounded-2xl p-5 mb-6 text-primary-foreground">

          <p className="text-sm opacity-80">
            Total Bills
          </p>

          <p className="text-3xl font-heading font-bold">
            {currency}
            {data.totalBills.toLocaleString()}
          </p>

          <div className="text-sm opacity-90 mt-2">

            Paid: 
            {currency}
            {data.totalPaid}

          </div>

          <div className="text-sm opacity-90">

            Remaining Salary: 
            {currency}
            {data.remaining}

          </div>

        </div>

      )}



      {data &&
        renderList(
          "Upcoming",
          data.upcoming
        )}

      {data &&
        renderList(
          "Pending",
          data.pending
        )}

      {data &&
        renderList(
          "Paid",
          data.paid
        )}

    </div>

  )

}

export default BillsScreen