import { FlatList, Text, View, Image, TouchableOpacity } from "react-native";
import MyStyles from "../../styles/MyStyles";
import { useEffect, useState } from "react";
import { ActivityIndicator, Chip, List, Searchbar } from "react-native-paper";
import Apis, { endpoints } from "../../configs/Apis";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
    const [categories, setCategories] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState([true]);
    const [q, setQ] = useState();
    const [page, setPage] = useState(1);
    const [cateId, setCateId] = useState(null);


    const loadCates = async () => {
        let res = await Apis.get(endpoints['categories']);
        setCategories(res.data);
    }

    const loadCourses = async () => {
        try {
            setLoading(true);

            let url = `${endpoints['courses']}?page=${page}`;

            if (q) {
                url = `${url}&q=${q}`;
            }

            if (cateId) {
                url = `${url}&category_id=${cateId}`;
            }

            let res = await Apis.get(url);
            setCourses(res.data.results);

        } catch (error) {
            console.log(error)

        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        let timer = setTimeout(() => {
            loadCates();
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        loadCourses();
    }, [q, page, cateId])

    const loadMore = () => {
        if (!loading && page > 0) {
            setPage(page + 1);
        }
    }


    return (
        <SafeAreaView style={[MyStyles.container, MyStyles.p]}>
            <View style={[MyStyles.row, MyStyles.wrap]}>
                <TouchableOpacity>
                    <Chip icon="label" style={MyStyles.m} onPress={() => setCateId(null)}>Tất cả</Chip>
                </TouchableOpacity>
                {categories.map(c => <TouchableOpacity key={c.id} onPress={() => setCateId(c.id)}>
                    <Chip icon="label" style={MyStyles.m}>{c.name}</Chip>
                </TouchableOpacity>)}
            </View>

            <Searchbar placeholder="Tìm khóa học..." value={q} onChangeText={setQ} />

            <FlatList onEndReached={loadMore} ListFooterComponent={loading && <ActivityIndicator size={30} />} data={courses} renderItem={({ item }) =>
                <List.Item title={item.subject} description={item.created_date} left={() =>
                    <TouchableOpacity>
                        <Image style={MyStyles.avatar} source={{ uri: item.image }} />
                    </TouchableOpacity>
                }>
                </List.Item>}>
            </FlatList>

        </SafeAreaView>
    );
}

export default Home;