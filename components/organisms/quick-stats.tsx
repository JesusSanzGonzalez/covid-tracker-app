import React, {FC} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Card} from '../atoms/card';

import {text} from '../../theme';
import {colors} from '../../constants/colors';
import {DataByDate} from '../../services/api';
import {getDateLocaleOptions} from '../../services/i18n/date';
import {format} from 'date-fns';

interface AppStatsProps {
  cases: DataByDate;
  deaths?: DataByDate;
}

export const QuickStats: FC<AppStatsProps> = ({cases, deaths}) => {
  const {i18n, t} = useTranslation();
  const dateLocale = getDateLocaleOptions(i18n);

  const [latestTimestamp, latestCases] = cases[cases.length - 1];
  const latestDeaths =
    deaths && deaths.length ? deaths[deaths.length - 1][1] : null;

  const casesText = t(
    latestCases === 1 ? 'confirmedChart:prevCase' : 'confirmedChart:prevCases'
  );
  const deathsText = t(
    latestDeaths === 1
      ? 'confirmedChart:prevDeath'
      : 'confirmedChart:prevDeaths'
  );

  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.row} accessible accessibilityRole="text">
          <View style={[styles.icon, styles.iconBackground]}>
            <Image
              accessibilityIgnoresInvertColors
              style={styles.iconSize}
              {...styles.iconSize}
              source={require('../../assets/images/covid-orange/covid.png')}
            />
          </View>
          <View style={styles.col}>
            <Text maxFontSizeMultiplier={1.75} style={styles.text}>
              {format(new Date(latestTimestamp), 'do MMMM', dateLocale)}
            </Text>
            <View style={styles.row}>
              <View style={styles.stat}>
                <Text maxFontSizeMultiplier={1.75}>
                  <Text maxFontSizeMultiplier={1.25} style={text.xxlargeBlack}>
                    {new Intl.NumberFormat('en-IE').format(latestCases)}{' '}
                  </Text>
                  <Text style={styles.text} numberOfLines={1}>
                    {casesText}
                  </Text>
                  <Text style={text.xlarge}> </Text>
                </Text>
              </View>
              {typeof latestDeaths === 'number' && (
                <View style={styles.stat}>
                  <Text maxFontSizeMultiplier={1.75}>
                    <Text
                      maxFontSizeMultiplier={1.25}
                      style={text.xxlargeBlack}>
                      {new Intl.NumberFormat('en-IE').format(latestDeaths)}{' '}
                    </Text>
                    <Text style={styles.text} numberOfLines={1}>
                      {deathsText}
                    </Text>
                    <Text style={text.xlarge}> </Text>
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  col: {
    flex: 1,
    flexDirection: 'column'
  },
  text: {
    flex: 1,
    ...text.defaultBold,
    color: colors.lighterText
  },
  icon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20
  },
  iconSize: {
    width: 36,
    height: 36
  },
  iconBackground: {
    backgroundColor: 'rgb(255, 236, 227)'
  },
  stat: {
    alignItems: 'baseline',
    flexGrow: 1,
    flexShrink: 1
  }
});
