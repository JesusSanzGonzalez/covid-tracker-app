import React, {FC} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Spacing} from '../../atoms/layout';
import {Card} from '../../atoms/card';
import {ResponsiveImage} from '../../atoms/responsive-image';

import {colors} from '../../../constants/colors';
import {text} from '../../../theme';

export const Active: FC = () => {
  const {t} = useTranslation();

  return (
    <Card padding={{h: 12, r: 12}}>
      <ResponsiveImage
        h={150}
        source={require('../../../assets/images/phone/active.png')}
      />
      <Spacing s={4} />
      <View style={styles.row}>
        <View style={styles.traceIcon}>
          <Image
            accessibilityIgnoresInvertColors
            style={styles.image}
            resizeMode="contain"
            source={require('../../../assets/images/contact-tracing/contact-tracing-spin.png')}
          />
        </View>
        <View style={styles.messageWrapper}>
          <Text style={text.defaultBold}>
            {t('contactTracing:active:title')}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  traceIcon: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(0, 207, 104, 0.1)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  messageWrapper: {
    flex: 1,
    backgroundColor: colors.gray,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 12
  },
  image: {
    width: 24,
    height: 24
  }
});
