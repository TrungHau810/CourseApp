import { FlatList, Image, Text, View } from "react-native";
import MyStyles from "../../styles/MyStyles";
import { useEffect, useState } from "react";
import { ActivityIndicator, Chip, List, Searchbar } from "react-native-paper";
import Apis, { endpoints } from "../../configs/Apis";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadCates = async () => {
        let res = await Apis.get(endpoints['categories']);
        setCategories(res.data);
    }

    const loadCourses = async () => {
        try {
            setLoading(true);
            let url = `${endpoints['courses']}?page=${page}`;
            
            if (q){
                url=`${url}?q=${q}`;
            }

            let res = await Apis.get(endpoints['courses']);
            setCourses(res.data.results);
        } catch {

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCates();
    }, []);

    useEffect(() => {
        loadCourses();
    }, []);

    return (
        <SafeAreaView style={MyStyles.conntainer}>
            <Text style={MyStyles.subject}>DANH SÁCH KHÓA HỌC</Text>
            <View style={[MyStyles.row, MyStyles.wrap]}>
                {categories.map(c => <Chip key={c.id} icon="label" style={MyStyles.m}>{c.name}</Chip>)}
            </View>

            <Searchbar
                placeholder="Search"
                // onChangeText={setQ}
                // value={q}
            />

            {/* <FlatList ListFooterComponent={loading && <ActivityIndicator />} data={courses} renderItem={({ item }) => <List.Item key={item.id} title={item.subject} description={item.created_date}
                left={() => <Image style={MyStyles.avatar} source={{ uri: item.image }} />} />} /> */}

        </SafeAreaView>
    );
}

export default Home;