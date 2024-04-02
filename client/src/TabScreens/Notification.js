import {StyleSheet, Text, View, Button, FlatList} from 'react-native';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {auth$, comment$} from '../Redux/selectors';
import {getResCmtRequest} from '../Redux/actions';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEllipsis, faUser} from '@fortawesome/free-solid-svg-icons';
import Header from '../Components/Header';

const Notification = () => {
  const dispatch = useDispatch();
  const auth = useSelector(auth$);
  const comment = useSelector(comment$);

  useEffect(() => {
    dispatch(getResCmtRequest(auth.id));
  }, [dispatch]);

  // console.log(comment.noti);

  return (
    <>
      <Header content={'Notification'} />
      <View style={styles.notiContainer}>
        {typeof comment.noti !== 'string' &&
          comment.noti.map(
            item =>
              item.user_id !== auth.id && (
                <View style={styles.notiCard}>
                  <View style={styles.left}>
                    <View style={styles.icon}>
                      <FontAwesomeIcon icon={faUser} color="#fff" size={36} />
                    </View>
                    <Text style={styles.notiText}>
                      One user answered your question! Please check!
                    </Text>
                  </View>
                  <View>
                    <FontAwesomeIcon
                      icon={faEllipsis}
                      color="#8252E7"
                      size={22}
                    />
                  </View>
                </View>
              ),
          )}
      </View>
    </>
  );
};

export default Notification;

const styles = StyleSheet.create({
  notiContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notiCard: {
    width: '100%',
    height: '15%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomColor: '#d8d8d8',
    borderBottomWidth: 2,
    paddingVertical: 16,
  },
  left: {
    height: '100%',
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    backgroundColor: '#8252E7',
    padding: 16,
    borderRadius: 48,
  },
  notiText: {
    width: '80%',
    fontSize: 16,
    fontFamily: 'Kanit-Regular',
  },
});
