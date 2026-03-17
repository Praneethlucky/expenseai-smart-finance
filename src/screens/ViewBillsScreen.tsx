import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Search,
  SlidersHorizontal,
} from "lucide-react";

import {
  GetUserBills,
  DeleteBill,
  UpdateBill,
} from "../services/billsService";

import { GetPaymentTypes } from "../services/paymentTypesService";
import { GetCategories } from "../services/categoryService";

import { categoryIconMap } from "../Icons/categoryIcons";

import { Bill, UpdateBillDto } from "../models/BillType";



const ViewBillsScreen = () => {

  const [bills, setBills] = useState<Bill[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [paymentTypes, setPaymentTypes] = useState<any[]>([]);

  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] =
    useState<"name" | "amount">("name");

  const [filterCat, setFilterCat] =
    useState<number | null>(null);

  const [selected, setSelected] =
    useState<Bill | null>(null);

  const [editMode, setEditMode] =
    useState(false);

  const [editName, setEditName] =
    useState("");

  const [editAmount, setEditAmount] =
    useState(0);



  // ================= LOAD =================

  const loadBills = async () => {

    const res = await GetUserBills();

    const data =
      Array.isArray(res)
        ? res
        : res.data;

    setBills(data);

  };

  const loadCategories = async () => {
    const res = await GetCategories();
    setCategories(res);
  };

  const loadPaymentTypes = async () => {
    const res = await GetPaymentTypes();
    setPaymentTypes(res);
  };

  useEffect(() => {

    loadBills();
    loadCategories();
    loadPaymentTypes();

  }, []);



  // ================= HELPERS =================

  const getCategory = (id: number) =>
    categories.find(
      x => x.categoryId === id
    );

  const getPayment = (id: number) =>
    paymentTypes.find(
      x =>
        x.paymentTypeId === id ||
        x.PaymentTypeId === id
    );



  // ================= FILTER =================

  let filtered = bills.filter(b =>
    b.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (filterCat)
    filtered = filtered.filter(
      b => b.categoryId === filterCat
    );

  filtered.sort((a, b) => {

    if (sortBy === "name")
      return a.name.localeCompare(b.name);

    return b.amount - a.amount;

  });


  const cats =
    categories.map(c => ({
      id: c.categoryId,
      name: c.name,
    }));



  // ================= OPEN =================

  const openDetails = (b: Bill) => {

    setSelected(b);

    setEditMode(false);

    setEditName(b.name);
    setEditAmount(b.amount);

  };



  // ================= DELETE =================

  const handleDelete = async (id: number) => {

    if (!confirm("Delete bill?"))
      return;

    const res = await DeleteBill(id);

    if (res.success) {

      toast.success("Deleted");

      loadBills();

      setSelected(null);

    }

  };


  // ================= UPDATE =================

  const handleSave = async () => {

    if (!selected) return;

    const dto:UpdateBillDto = {

      billId: selected.billId,
      name: editName,
      amount: editAmount,

    };

    const res = await UpdateBill(dto);

    if (res.success) {

      toast.success("Updated");

      loadBills();

      setEditMode(false);

    }

  };



  // ================= UI =================

  return (

    <div className="px-4 pt-6">

      <h1 className="text-2xl font-heading font-bold text-foreground mb-4">
        Bills
      </h1>


      {/* SEARCH */}

      <div className="relative mb-4">

        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />

        <Input
          value={search}
          onChange={e =>
            setSearch(e.target.value)
          }
          placeholder="Search bills..."
          className="pl-9 h-11 rounded-xl"
        />

      </div>


      {/* FILTER BAR (same as transactions) */}

      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <SlidersHorizontal size={14} />
        </div>


        {["name", "amount"].map(s => (

          <button
            key={s}
            onClick={() =>
              setSortBy(s as any)
            }
            className={`text-xs px-3 py-1.5 rounded-full ${
              sortBy === s
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {s}
          </button>

        ))}


        <div className="w-px h-5 bg-border" />


        <button
          onClick={() =>
            setFilterCat(null)
          }
          className={`text-xs px-3 py-1.5 rounded-full ${
            !filterCat
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          }`}
        >
          All
        </button>


        {cats.map(c => (

          <button
            key={c.id}
            onClick={() =>
              setFilterCat(c.id)
            }
            className={`text-xs px-3 py-1.5 rounded-full ${
              filterCat === c.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {c.name}
          </button>

        ))}

      </div>


      {/* LIST (circle icon like transactions) */}

      <div className="space-y-2">

        {filtered.map(b => {

          const cat =
            getCategory(
              b.categoryId
            );

          const Icon =
            categoryIconMap[
              cat?.icon
            ] ||
            categoryIconMap[
              "Wallet"
            ];

          return (

            <div
              key={b.billId}
              onClick={() =>
                openDetails(b)
              }
              className="bg-card rounded-xl p-4 shadow-card flex items-center justify-between"
            >

              <div className="flex items-center gap-3">

                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">

                  <Icon size={16} />

                </div>

                <div>

                  <div className="font-medium">
                    {b.name}
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {cat?.name}
                  </div>

                </div>

              </div>

              <div className="text-sm font-semibold">
                ₹ {b.amount}
              </div>

            </div>

          );

        })}

      </div>


      {/* DIALOG */}

      <Dialog
        open={!!selected}
        onOpenChange={() =>
          setSelected(null)
        }
      >

        <DialogContent className="rounded-2xl max-w-sm mx-auto">

          <DialogHeader>
            <DialogTitle>
              Bill Details
            </DialogTitle>
          </DialogHeader>


          {selected && (

            <div className="space-y-3">

              <div>
                {getPayment(
                  selected.paymentTypeId
                )?.Name}
              </div>

              <Input
                value={editName}
                disabled={!editMode}
                onChange={e =>
                  setEditName(
                    e.target.value
                  )
                }
              />

              <Input
                type="number"
                value={editAmount}
                disabled={!editMode}
                onChange={e =>
                  setEditAmount(
                    Number(
                      e.target.value
                    )
                  )
                }
              />

              <div className="flex gap-2">

                {!editMode && (
                  <button
                    onClick={() =>
                      setEditMode(true)
                    }
                  >
                    Edit
                  </button>
                )}

                {editMode && (
                  <button
                    onClick={handleSave}
                  >
                    Save
                  </button>
                )}

                <button
                  onClick={() =>
                    handleDelete(
                      selected.billId
                    )
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          )}

        </DialogContent>

      </Dialog>

    </div>

  );

};

export default ViewBillsScreen;