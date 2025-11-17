import { motion } from "framer-motion";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AdminAnalytics = () => {
  const orders = JSON.parse(localStorage.getItem("zaliant_orders") || "[]");

  // Revenue data
  const revenueData = [
    { month: "Jan", revenue: 4200 },
    { month: "Feb", revenue: 5100 },
    { month: "Mar", revenue: 6800 },
    { month: "Apr", revenue: 5900 },
    { month: "May", revenue: 7200 },
    { month: "Jun", revenue: 8100 },
  ];

  // Orders data
  const ordersData = [
    { month: "Jan", orders: 45 },
    { month: "Feb", orders: 52 },
    { month: "Mar", orders: 68 },
    { month: "Apr", orders: 61 },
    { month: "May", orders: 74 },
    { month: "Jun", orders: 82 },
  ];

  // Product sales data
  const productData = [
    { name: "VPN", value: 30 },
    { name: "Discord", value: 25 },
    { name: "Email", value: 20 },
    { name: "Storage", value: 15 },
    { name: "Gaming", value: 10 },
  ];

  const COLORS = ["#6D28D9", "#A78BFA", "#C4B5FD", "#DDD6FE", "#EDE9FE"];

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-gradient">Analytics Dashboard</h1>

        <div className="space-y-8">
          {/* Revenue Chart */}
          <Card className="glass border-border/50">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Revenue Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4C1D95" />
                  <XAxis dataKey="month" stroke="#A78BFA" />
                  <YAxis stroke="#A78BFA" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#2E1065",
                      border: "1px solid #6D28D9",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#6D28D9"
                    strokeWidth={3}
                    dot={{ fill: "#A78BFA", r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Orders Chart */}
            <Card className="glass border-border/50">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Orders by Month</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={ordersData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4C1D95" />
                    <XAxis dataKey="month" stroke="#A78BFA" />
                    <YAxis stroke="#A78BFA" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#2E1065",
                        border: "1px solid #6D28D9",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Bar dataKey="orders" fill="#6D28D9" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Product Sales Chart */}
            <Card className="glass border-border/50">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6">Product Sales Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={productData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => entry.name}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {productData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#2E1065",
                        border: "1px solid #6D28D9",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
