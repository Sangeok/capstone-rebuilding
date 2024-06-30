import { userStore } from "../store/user-store";

export default function SearchingFacilityPage() {
    const {userInfo} = userStore();

    console.log(userInfo);
    return (
        <div className="flex flex-col h-screen pt-16">
            <h1>SearchingFacilityPage</h1>
        </div>
    );
}