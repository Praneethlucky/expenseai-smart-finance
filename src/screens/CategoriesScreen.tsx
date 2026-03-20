import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2, X, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

import {
  GetCategories,
  CreateCategory,
  UpdateCategory,
  DeleteCategory
} from "../services/categoryService";

import { Category, CreateCategoryDto } from "../models/category";

import { getCategoryIcon } from "../Icons/categoryIcons";
import IconPicker from "@/Icons/IconPicker";


const CategoriesScreen = () => {

  const location = useLocation();

  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [tab, setTab] = useState<"user" | "default">("user");

  const [editing, setEditing] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOpenAdd = () => {
    setError(null);
    setShowAdd(true);
  };

  const [editName, setEditName] = useState("");
  const [editIcon, setEditIcon] = useState("Circle");

  const [showAdd, setShowAdd] = useState(false);

  const [newName, setNewName] = useState("");
  const [newIcon, setNewIcon] = useState("Circle");


  // =========================
  // LOAD
  // =========================

  const loadCategories = async () => {

    try {

      setLoading(true);

      const cats = await GetCategories();

      const sorted = cats.sort((a, b) => {

        if (a.isSystem !== b.isSystem) {
          return a.isSystem ? 1 : -1;
        }

        return a.name.localeCompare(b.name);

      });

      setCategories(sorted);

    }
    finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadCategories();
  }, [location.pathname]);


  // =========================
  // FILTER
  // =========================

  const userCategories = categories.filter(c => !c.isSystem);
  const defaultCategories = categories.filter(c => c.isSystem);

  const visible =
    tab === "user"
      ? userCategories
      : defaultCategories;



  // =========================
  // ADD
  // =========================

  const handleAdd = async () => {

  if (!newName.trim()) {
    setError("Name required");
    return;
  }

  try {

    setError(null);
    setSaving(true);

    const dto: CreateCategoryDto = {
      name: newName,
      type: "Expense",
      icon: newIcon,
      color: "hsl(258,65%,58%)"
    };

    await CreateCategory(dto);

    setShowAdd(false);

    await loadCategories();

    toast.success("Category added");

  }
  catch (e: any) {

    setError(e.message || "Failed");

  }
  finally {
    setSaving(false);
  }

};


  // =========================
  // EDIT
  // =========================

  const startEdit = (c: Category) => {

    setError(null);
    setEditing(c.categoryId);
    setEditName(c.name);
    setEditIcon(c.icon);

  };


  const saveEdit = async () => {

  if (!editing) return;

  try {

    setError(null);
    setSaving(true);

    const dto: Category = {
      categoryId: editing,
      name: editName,
      type: "Expense",
      icon: editIcon,
      color: "hsl(258,65%,58%)",
      isSystem: false
    };
    await UpdateCategory(dto);

    setEditing(null);

    await loadCategories();

    toast.success("Updated");

  }
  catch (e: any) {

    setError(e.message || "Failed");

  }
  finally {
    setSaving(false);
  }

};

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id: number) => {

    try {

      setSaving(true);

      await DeleteCategory(id);

      await loadCategories();

      toast.success("Deleted");

    }
    finally {
      setSaving(false);
    }

  };


  // =========================
  // UI
  // =========================

  return (

    <div className="px-4 pt-6">


      {/* HEADER */}

      <div className="flex justify-between mb-4">

        <h1 className="text-2xl font-bold">

          Categories

        </h1>


        {tab === "user" && (

          <Button
            size="sm"
            variant="gradient"
            disabled={saving}
            onClick={() => setShowAdd(true)}
          >
            <Plus size={16} />
            Add
          </Button>

        )}

      </div>



      {/* TABS */}

      <div className="flex gap-2 mb-4">

        <button
          onClick={() => setTab("user")}
          className={`px-3 py-1 rounded-lg text-sm ${
            tab === "user"
              ? "bg-primary text-white"
              : "bg-muted"
          }`}
        >
          My Categories
        </button>


        <button
          onClick={() => setTab("default")}
          className={`px-3 py-1 rounded-lg text-sm ${
            tab === "default"
              ? "bg-primary text-white"
              : "bg-muted"
          }`}
        >
          Default
        </button>

      </div>



      {/* LOADING */}

      {loading && (

        <div className="flex justify-center p-6">

          <Loader2 className="animate-spin" />

        </div>

      )}



      {/* ADD */}

      {showAdd && (

        <div className="bg-card p-4 rounded-xl shadow mb-4">

          <Input
            value={newName}
            onChange={e => setNewName(e.target.value)}
            placeholder="Name"
          />

          <IconPicker
            value={newIcon}
            onChange={setNewIcon}
          />
{error && (
      <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg mt-2">
        {error}
      </div>
    )}
          <div className="flex gap-2 mt-2">

            <Button
              size="sm"
              disabled={saving}
              onClick={handleAdd}
            >
              Save
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowAdd(false)}
            >
              Cancel
            </Button>

          </div>

        </div>

      )}



      {/* EMPTY */}

      {!loading && visible.length === 0 && (

        <div className="bg-card p-6 rounded-xl text-center">

          No categories

        </div>

      )}



      {/* LIST */}

      <div className="space-y-2">

        {visible.map(cat => {

          const Icon = getCategoryIcon(cat.icon);

          return (

            <div
              key={cat.categoryId}
              className="bg-card p-4 rounded-xl flex items-center gap-3"
            >

              <div
                className="w-8 h-8 flex items-center justify-center rounded-lg"
                style={{
                  backgroundColor: cat.color,
                  opacity: 0.2
                }}
              >
                <Icon size={16} />
              </div>



              {editing === cat.categoryId ? (

                <div className="flex-1">

                  <Input
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                  />

                  <IconPicker
                    value={editIcon}
                    onChange={setEditIcon}
                  />

                {error && (
                      <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg mt-2">
                        {error}
                      </div>
                    )}
                  <div className="flex gap-2 mt-2">

                    <Button
                      size="sm"
                      disabled={saving}
                      onClick={saveEdit}
                    >
                      Save
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditing(null)}
                    >
                      Cancel
                    </Button>

                  </div>

                </div>

              ) : (

                <>

                  <span className="flex-1">

                    {cat.name}

                  </span>


                  {cat.isSystem && (

                    <span className="text-xs text-muted-foreground">

                      Default

                    </span>

                  )}


                  {!cat.isSystem && (

                    <button
                      disabled={saving}
                      onClick={() => startEdit(cat)}
                    >
                      <Pencil size={16} />
                    </button>

                  )}


                  {!cat.isSystem && (

                    <button
                      disabled={saving}
                      onClick={() => handleDelete(cat.categoryId)}
                    >
                      <Trash2 size={16} />
                    </button>

                  )}

                </>

              )}

            </div>

          );

        })}

      </div>

    </div>

  );

};


export default CategoriesScreen;