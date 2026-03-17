import { useEffect, useState } from "react"
import {
  Debt,
  DebtSummary,
  DebtType,
  CreateDebtDto,
  AddDebtPaymentDto,
} from "../models/DebtType"

import { DebtService } from "../services/debtService"



export default function AddDebtScreen() {

  const [debts, setDebts] = useState<Debt[]>([])
  const [summary, setSummary] = useState<DebtSummary | null>(null)

  const [showAdd, setShowAdd] = useState(false)
  const [showPay, setShowPay] = useState<number | null>(null)

  const [expanded, setExpanded] = useState<string | null>(null)

  const [name, setName] = useState("")
  const [type, setType] = useState<DebtType>("GIVEN")
  const [amount, setAmount] = useState<number>(0)
  const [desc, setDesc] = useState("")

  const [payAmount, setPayAmount] = useState(0)
  const [payDate, setPayDate] = useState("")



  // ================= LOAD =================

  const load = async () => {

    const d = await DebtService.list()
    const s = await DebtService.summary()

    setDebts(d)
    setSummary(s)

  }

  useEffect(() => {
    load()
  }, [])



  // ================= GROUP =================

  const groupByPerson = (debts: Debt[]) => {

    const map: Record<string, Debt[]> = {}

    debts.forEach(d => {

      if (!map[d.personName]) {
        map[d.personName] = []
      }

      map[d.personName].push(d)

    })

    return map
  }


  const personSummary = (list: Debt[]) => {

    let given = 0
    let taken = 0

    list.forEach(d => {

      if (d.type === "GIVEN") given += d.pending
      else taken += d.pending

    })

    return { given, taken }

  }


  const grouped = groupByPerson(debts)



  // ================= ACTIONS =================

  const addDebt = async () => {

    const dto: CreateDebtDto = {
      personName: name,
      type,
      amount,
      description: desc,
    }

    await DebtService.create(dto)

    setShowAdd(false)
    setName("")
    setAmount(0)
    setDesc("")

    load()
  }


  const addPayment = async () => {

    if (!showPay) return

    const dto: AddDebtPaymentDto = {
      debtId: showPay,
      amount: payAmount,
      paymentDate: payDate,
    }

    await DebtService.payment(dto)

    setShowPay(null)
    setPayAmount(0)
    setPayDate("")

    load()
  }



  // ================= UI =================

  return (

    <div className="p-6 space-y-6">

      {/* HEADER */}

      <div className="flex justify-between">

        <h1 className="text-2xl font-semibold">
          Debts
        </h1>

        <button
          className="px-4 py-2 rounded-xl bg-blue-600 text-white"
          onClick={() => setShowAdd(true)}
        >
          Add
        </button>

      </div>



      {/* SUMMARY */}

      {summary && (

        <div className="grid grid-cols-3 gap-4">

          <div className="rounded-xl shadow p-4 bg-white">
            <div className="text-sm">Given</div>
            <div className="text-lg font-semibold text-green-600">
              ₹ {summary.givenPending}
            </div>
          </div>

          <div className="rounded-xl shadow p-4 bg-white">
            <div className="text-sm">Taken</div>
            <div className="text-lg font-semibold text-red-600">
              ₹ {summary.takenPending}
            </div>
          </div>

          <div className="rounded-xl shadow p-4 bg-white">
            <div className="text-sm">Net</div>
            <div className="text-lg font-semibold">
              ₹ {summary.net}
            </div>
          </div>

        </div>

      )}



      {/* PERSON LIST */}

      <div className="space-y-4">

        {Object.entries(grouped).map(([person, list]) => {

          const s = personSummary(list)

          const open = expanded === person

          return (

            <div
              key={person}
              className="rounded-xl shadow bg-white"
            >

              {/* HEADER */}

              <div
                className="p-4 flex justify-between cursor-pointer"
                onClick={() =>
                  setExpanded(open ? null : person)
                }
              >

                <div className="font-semibold">
                  {person}
                </div>

                <div className="text-sm flex gap-4">

                  <div className="text-green-600">
                    +{s.given}
                  </div>

                  <div className="text-red-600">
                    -{s.taken}
                  </div>

                </div>

              </div>



              {/* DROPDOWN */}

              {open && (

                <div className="border-t p-4 space-y-3">

                  {list.map(d => (

                    <div
                      key={d.debtId}
                      className="border rounded-lg p-3 flex justify-between"
                    >

                      <div>

                        <div
                          className={
                            d.type === "GIVEN"
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {d.type}
                        </div>

                        <div>
                          Total ₹ {d.totalAmount}
                        </div>

                        <div className="text-sm">
                          Paid ₹ {d.paid}
                        </div>

                        <div className="font-medium">
                          Pending ₹ {d.pending}
                        </div>

                      </div>


                      <button
  className="h-7 px-2 text-xs rounded-md bg-blue-600 text-white hover:bg-blue-700"
  onClick={() => setShowPay(d.debtId)}
>
  Pay
</button>

                    </div>

                  ))}

                </div>

              )}

            </div>

          )

        })}

      </div>



      {/* ADD MODAL */}

      {showAdd && (

        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

          <div className="bg-white rounded-2xl p-6 w-[400px] space-y-4">

            <h2 className="text-lg font-semibold">
              Add Debt
            </h2>


            <input
              className="w-full h-12 border rounded-xl px-3"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />


            <div className="flex gap-4">

              <label>
                <input
                  type="radio"
                  checked={type === "GIVEN"}
                  onChange={() => setType("GIVEN")}
                />
                Given
              </label>

              <label>
                <input
                  type="radio"
                  checked={type === "TAKEN"}
                  onChange={() => setType("TAKEN")}
                />
                Taken
              </label>

            </div>


            <input
              type="number"
              className="w-full h-12 border rounded-xl px-3"
              placeholder="Amount"
              value={amount}
              onChange={e =>
                setAmount(e.target.valueAsNumber)
              }
            />


            <input
              className="w-full h-12 border rounded-xl px-3"
              placeholder="Description"
              value={desc}
              onChange={e => setDesc(e.target.value)}
            />


            <div className="flex justify-end gap-2">

              <button
                className="px-4 py-2 border rounded-xl"
                onClick={() => setShowAdd(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-xl"
                onClick={addDebt}
              >
                Save
              </button>

            </div>

          </div>

        </div>

      )}



      {/* PAYMENT MODAL */}

      {showPay && (

        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

          <div className="bg-white rounded-2xl p-6 w-[400px] space-y-4">

            <h2 className="text-lg font-semibold">
              Add Payment
            </h2>

            <input
              type="number"
              className="w-full h-12 border rounded-xl px-3"
              placeholder="Amount"
              value={payAmount}
              onChange={e =>
                setPayAmount(e.target.valueAsNumber)
              }
            />

            <input
              type="date"
              className="w-full h-12 border rounded-xl px-3"
              value={payDate}
              onChange={e =>
                setPayDate(e.target.value)
              }
            />

            <div className="flex justify-end gap-2">

              <button
                className="px-4 py-2 border rounded-xl"
                onClick={() => setShowPay(null)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-xl"
                onClick={addPayment}
              >
                Save
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  )

}