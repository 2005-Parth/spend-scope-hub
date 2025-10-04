import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { toast } from "sonner";
import { UserPlus, DollarSign, Users as UsersIcon, TrendingUp } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
}

interface AllExpense {
  id: string;
  employeeName: string;
  department: string;
  amount: string;
  purpose: string;
  date: string;
  status: "pending" | "approved" | "reimbursed" | "rejected";
}

const Admin = () => {
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "Sarah Johnson", email: "sarah.j@company.com", department: "Marketing", role: "Employee" },
    { id: "2", name: "Michael Chen", email: "michael.c@company.com", department: "Sales", role: "Employee" },
    { id: "3", name: "Emma Davis", email: "emma.d@company.com", department: "IT", role: "Manager" },
  ]);

  const [allExpenses] = useState<AllExpense[]>([
    {
      id: "1",
      employeeName: "Sarah Johnson",
      department: "Marketing",
      amount: "$320.00",
      purpose: "Marketing materials",
      date: "2025-03-18",
      status: "pending",
    },
    {
      id: "2",
      employeeName: "Michael Chen",
      department: "Sales",
      amount: "$150.00",
      purpose: "Client dinner",
      date: "2025-03-17",
      status: "approved",
    },
    {
      id: "3",
      employeeName: "Emma Davis",
      department: "IT",
      amount: "$540.00",
      purpose: "Software license",
      date: "2025-03-16",
      status: "reimbursed",
    },
  ]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    department: "",
    role: "Employee",
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newUser.name || !newUser.email || !newUser.department) {
      toast.error("Please fill in all fields");
      return;
    }

    const user: User = {
      id: String(users.length + 1),
      ...newUser,
    };

    setUsers([...users, user]);
    setNewUser({ name: "", email: "", department: "", role: "Employee" });
    toast.success("User added successfully");
  };

  const totalExpenses = allExpenses.length;
  const totalAmount = allExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount.replace("$", "")), 0);
  const pendingCount = allExpenses.filter((e) => e.status === "pending").length;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Portal</h1>
        <p className="text-muted-foreground">Manage users and oversee all expense activities</p>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExpenses}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalAmount.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <TrendingUp className="h-4 w-4 text-pending" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New User</CardTitle>
            <CardDescription>Create a new user account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@company.com"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  placeholder="e.g., Marketing, Sales, IT"
                  value={newUser.department}
                  onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Employee">Employee</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full">
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Current system users</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <span className="text-sm px-2 py-1 rounded-md bg-accent">
                        {user.role}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Expenses</CardTitle>
          <CardDescription>Overview of all expense submissions across departments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allExpenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.employeeName}</TableCell>
                  <TableCell>{expense.department}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell className="font-semibold">{expense.amount}</TableCell>
                  <TableCell>{expense.purpose}</TableCell>
                  <TableCell>
                    <StatusBadge status={expense.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Admin;
