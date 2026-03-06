import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { toast } from 'sonner';

const CategoriesScreen = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useApp();
  const [editing, setEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');

  const startEdit = (id: string, name: string) => {
    setEditing(id);
    setEditName(name);
  };

  const saveEdit = () => {
    if (editing && editName.trim()) {
      updateCategory(editing, { name: editName.trim() });
      setEditing(null);
      toast.success('Category updated');
    }
  };

  const handleAdd = () => {
    if (newName.trim()) {
      addCategory({ name: newName.trim(), icon: 'Tag', color: 'hsl(258, 65%, 58%)' });
      setNewName('');
      setShowAdd(false);
      toast.success('Category added');
    }
  };

  const handleDelete = (id: string) => {
    deleteCategory(id);
    toast.success('Category deleted');
  };

  return (
    <div className="px-4 pt-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-heading font-bold text-foreground">Categories</h1>
        <Button onClick={() => setShowAdd(true)} size="sm" variant="gradient" className="rounded-xl">
          <Plus size={16} /> Add
        </Button>
      </div>

      {showAdd && (
        <div className="bg-card rounded-xl p-4 shadow-card mb-4 flex gap-2">
          <Input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Category name" className="rounded-lg flex-1" />
          <button onClick={handleAdd} className="text-income"><Check size={20} /></button>
          <button onClick={() => setShowAdd(false)} className="text-muted-foreground"><X size={20} /></button>
        </div>
      )}

      <div className="space-y-2">
        {categories.map(cat => (
          <div key={cat.id} className="bg-card rounded-xl p-4 shadow-card flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: cat.color, opacity: 0.2 }} />
            {editing === cat.id ? (
              <div className="flex-1 flex gap-2">
                <Input value={editName} onChange={e => setEditName(e.target.value)} className="rounded-lg h-8 text-sm" />
                <button onClick={saveEdit} className="text-income"><Check size={18} /></button>
                <button onClick={() => setEditing(null)} className="text-muted-foreground"><X size={18} /></button>
              </div>
            ) : (
              <>
                <span className="flex-1 text-sm font-medium text-foreground">{cat.name}</span>
                <button onClick={() => startEdit(cat.id, cat.name)} className="text-muted-foreground hover:text-foreground"><Pencil size={16} /></button>
                <button onClick={() => handleDelete(cat.id)} className="text-muted-foreground hover:text-expense"><Trash2 size={16} /></button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesScreen;
