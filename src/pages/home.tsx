import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

const Home = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <h1 className="text-4xl font-bold mb-4">Welcome to the CommUnity App</h1>
                <p className="text-lg mb-8 max-w-xl text-center">
                    Connect, share, and join events in your community. Explore upcoming events or create your own!
                </p>
                <div className="flex space-x-4">
                    <Button asChild>
                        <a href="/events">View Events</a>
                    </Button>
                    <Button variant="outline" asChild>
                        <a href="/create">Create Event</a>
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 mt-10">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Badge variant="secondary" className="text-xl">42</Badge>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Events Joined</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Badge variant="secondary" className="text-xl">17</Badge>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Active Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Badge variant="secondary" className="text-xl">128</Badge>
                    </CardContent>
                </Card>
            </div>
            {/* Rest of the content */}
        </div>
    );
};

export default Home;
