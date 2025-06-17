import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { User, Mail, Bell, Shield, Palette, Database, Key } from "lucide-react";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    slack: true,
    deployments: true,
  });

  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    username: "johndoe",
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleProfileChange = (key: string, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const SettingSection = ({ title, description, icon: Icon, children }: {
    title: string;
    description: string;
    icon: any;
    children: React.ReactNode;
  }) => (
    <Card className="bg-replit-card border-slate-600">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-replit-blue rounded-lg flex items-center justify-center">
            <Icon className="text-white" size={20} />
          </div>
          <div>
            <CardTitle className="text-white">{title}</CardTitle>
            <p className="text-slate-400 text-sm">{description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Manage your account settings and preferences.</p>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* Profile Settings */}
        <SettingSection
          title="Profile Information"
          description="Update your personal information and account details"
          icon={User}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-slate-300">First Name</Label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) => handleProfileChange("firstName", e.target.value)}
                className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-slate-300">Last Name</Label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e) => handleProfileChange("lastName", e.target.value)}
                className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileChange("email", e.target.value)}
                className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
              />
            </div>
            <div>
              <Label htmlFor="username" className="text-slate-300">Username</Label>
              <Input
                id="username"
                value={profile.username}
                onChange={(e) => handleProfileChange("username", e.target.value)}
                className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
              />
            </div>
          </div>
          <Separator className="my-4 bg-slate-600" />
          <div className="flex justify-end">
            <Button className="bg-replit-blue hover:bg-blue-600 text-white">
              Save Changes
            </Button>
          </div>
        </SettingSection>

        {/* Notification Settings */}
        <SettingSection
          title="Notifications"
          description="Configure how you receive notifications"
          icon={Bell}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 font-medium">Email Notifications</p>
                <p className="text-slate-400 text-sm">Receive notifications via email</p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => handleNotificationChange("email", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 font-medium">Push Notifications</p>
                <p className="text-slate-400 text-sm">Receive push notifications in browser</p>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => handleNotificationChange("push", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 font-medium">Slack Integration</p>
                <p className="text-slate-400 text-sm">Send notifications to Slack channels</p>
              </div>
              <Switch
                checked={notifications.slack}
                onCheckedChange={(checked) => handleNotificationChange("slack", checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 font-medium">Deployment Alerts</p>
                <p className="text-slate-400 text-sm">Get notified about deployment status</p>
              </div>
              <Switch
                checked={notifications.deployments}
                onCheckedChange={(checked) => handleNotificationChange("deployments", checked)}
              />
            </div>
          </div>
        </SettingSection>

        {/* Security Settings */}
        <SettingSection
          title="Security"
          description="Manage your account security and authentication"
          icon={Shield}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 font-medium">Two-Factor Authentication</p>
                <p className="text-slate-400 text-sm">Add an extra layer of security to your account</p>
              </div>
              <Badge className="bg-replit-green/20 text-replit-green border-0">
                Enabled
              </Badge>
            </div>
            <Separator className="bg-slate-600" />
            <div className="space-y-3">
              <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                Change Password
              </Button>
              <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                Download Recovery Codes
              </Button>
              <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                View Login History
              </Button>
            </div>
          </div>
        </SettingSection>

        {/* API Keys */}
        <SettingSection
          title="API Keys"
          description="Manage your API keys and integrations"
          icon={Key}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
              <div>
                <p className="text-slate-300 font-medium">Production API Key</p>
                <p className="text-slate-400 text-sm font-mono">rpl_••••••••••••••••••••••••••••••••</p>
              </div>
              <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                Regenerate
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
              <div>
                <p className="text-slate-300 font-medium">Development API Key</p>
                <p className="text-slate-400 text-sm font-mono">rpl_••••••••••••••••••••••••••••••••</p>
              </div>
              <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                Regenerate
              </Button>
            </div>
            <Button className="bg-replit-blue hover:bg-blue-600 text-white">
              <Key className="mr-2 h-4 w-4" />
              Create New API Key
            </Button>
          </div>
        </SettingSection>

        {/* Danger Zone */}
        <Card className="bg-red-950/20 border-red-800">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <Shield className="text-white" size={20} />
              </div>
              <div>
                <CardTitle className="text-red-400">Danger Zone</CardTitle>
                <p className="text-red-300 text-sm">Irreversible and destructive actions</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="destructive" className="w-full bg-red-600 hover:bg-red-700">
                Delete Account
              </Button>
              <p className="text-red-300 text-xs">
                This action cannot be undone. This will permanently delete your account and all associated data.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
