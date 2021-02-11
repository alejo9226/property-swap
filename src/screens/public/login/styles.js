import { StyleSheet } from 'react-native';
import { COLORS, LOGO } from '../../../constants/theme'

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: '30%',
        backgroundColor: COLORS.background
    },
    title: {

    },
    logo: LOGO,
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'white',
        width: '85%',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 16
    },
    button: {
        backgroundColor: COLORS.primary,
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        width: '85%',
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#611f69",
        fontWeight: "bold",
        fontSize: 16
    }
})