import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
// import { Input } from "../../components/ui/input";
// import { Textarea } from "../../components/ui/textarea";
// import { Button } from "../../components/ui/button";
// import { Switch } from "../../components/ui/switch";
// import { Label } from "../../components/ui/label";

const Profile = () => {
    const [joinedEvents, setJoinedEvents] = useState<any[]>([]);
    const [createdEvents, setCreatedEvents] = useState<any[]>([]);
    const [userData, setUserData] = useState<any>(null);
    // const [isEditing, setIsEditing] = useState(false);
    // const [profileData, setProfileData] = useState<any>({});
    // const [formData, setFormData] = useState({
    //     bio: "",
    //     phoneNumber: "",
    //     socialHandle: "",
    //     interests: "",
    //     showEmail: false,
    //     showPhoneNumber: false
    // });
    const [user, loading] = useAuthState(auth);

    useEffect(() => {
        if (!user?.uid) return;


        const fetchProfile = async () => {
            if (!user) return;
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                const res = await axios.get(`${apiUrl}/api/users/profile/${user.uid}`);
                const data = res.data;
                setUserData(data);
                //setProfileData(data);

                setJoinedEvents(res.data.joinedEvents || []);
                setCreatedEvents(res.data.createdEvents || []);
                // setFormData({
                //     bio: res.data.bio || "",
                //     phoneNumber: res.data.phoneNumber || "",
                //     socialHandle: res.data.socialHandle || "",
                //     interests: res.data.interests?.join(", ") || "",
                //     showEmail: res.data.showEmail || false,
                //     showPhoneNumber: res.data.showPhoneNumber || false,
                // });
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, [user?.uid]);

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>Please log in to view your profile.</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-6">
            <Card>
                <CardHeader className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                        <AvatarImage src={user?.photoURL || ""} alt={user?.displayName} />
                        <AvatarFallback>{user?.displayName?.charAt(0) ?? "U"}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-y-3">
                        <CardTitle className="text-4xl">{user?.displayName}</CardTitle>
                        <Badge variant="outline">{user?.email}</Badge>
                    </div>
                </CardHeader>
            </Card>

            {/* <div className="mb-6">
                <h2 className="text-xl font-semibold">Profile Info</h2>

                {isEditing ? (
                    <div className="space-y-4 mt-4">
                        <Textarea
                            placeholder="Bio"
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        />
                        <Input
                            placeholder="Phone Number"
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        />
                        <Input
                            placeholder="Social Handle (e.g. @username)"
                            value={formData.socialHandle}
                            onChange={(e) => setFormData({ ...formData, socialHandle: e.target.value })}
                        />
                        <Input
                            placeholder="Interests (comma separated)"
                            value={formData.interests}
                            onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                        />

                        <div className="flex items-center gap-2">
                            <Switch
                                checked={formData.showEmail}
                                onCheckedChange={(val) => setFormData({ ...formData, showEmail: val })}
                            />
                            <Label>Show Email Publicly</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Switch
                                checked={formData.showPhoneNumber}
                                onCheckedChange={(val) => setFormData({ ...formData, showPhoneNumber: val })}
                            />
                            <Label>Show Phone Number Publicly</Label>
                        </div>

                        <Button
                            onClick={async () => {
                                try {
                                    const payload = {
                                        ...formData,
                                        interests: formData.interests.split(",").map(i => i.trim()),
                                        uid: user?.uid,
                                    };
                                    const apiUrl = import.meta.env.VITE_API_URL;
                                    await axios.put(`${apiUrl}/api/users/profile/${user?.uid}`, payload);
                                    setIsEditing(false);
                                } catch (err) {
                                    console.error("Update failed", err);
                                }
                            }}
                        >
                            Save Changes
                        </Button>
                    </div>
                ) : (
                    <div className="mt-4">
                        <p><strong>Bio:</strong> {profileData.bio || "N/A"}</p>
                        <p><strong>Phone:</strong> {profileData.phoneNumber || "N/A"}</p>
                        <p><strong>Social:</strong> {profileData.socialHandle || "N/A"}</p>
                        <p><strong>Interests:</strong> {profileData.interests?.join(", ") || "N/A"}</p>
                        <p><strong>Show Email:</strong> {profileData.showEmail ? "Yes" : "No"}</p>
                        <p><strong>Show Phone:</strong> {profileData.showPhoneNumber ? "Yes" : "No"}</p>
                        <Button className="mt-2" onClick={() => setIsEditing(true)}>Edit Profile</Button>
                    </div>
                )}
            </div> */}
            {/* Joined Events and Created Events below this */}
            {/* Joined Events */}
            <div>
                <h2 className="text-2xl font-semibold mb-2">Joined Events</h2>
                <Separator />
                {joinedEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {joinedEvents.map((event) => (
                            <Card key={event._id}>
                                <CardHeader>
                                    <CardTitle>{event.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-1">
                                    <p className="text-sm text-muted-foreground">
                                        {event.description}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Date: {new Date(event.date).toDateString()}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Location: {event.location}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground mt-2">No events joined yet.</p>
                )}
            </div>

            {/* Created Events */}
            <div>
                <h2 className="text-2xl font-semibold mb-2">Created Events</h2>
                <Separator />
                {createdEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {createdEvents.map((event) => (
                            <Card key={event._id}>
                                <CardHeader>
                                    <CardTitle>{event.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-1">
                                    <p className="text-sm text-muted-foreground">
                                        {event.description}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Date: {new Date(event.date).toDateString()}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Location: {event.location}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground mt-2">No events created yet.</p>
                )}
            </div>
        </div>
    );
};
export default Profile;
// This code is a React component that fetches and displays a user's profile information, including the events they have joined.