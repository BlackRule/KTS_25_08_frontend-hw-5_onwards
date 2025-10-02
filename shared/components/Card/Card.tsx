"use client"

import Image from 'next/image'
import cn from 'classnames'
import Text from '@/shared/components/Text'
import styles from './Card.module.scss'

export type CardProps = {
  /*+*/
/** Слот для действия */
  actionSlot?: React.ReactNode;
  /*+*/
  /** Слот над заголовком */
  captionSlot?: React.ReactNode;
  /** Дополнительный classname */
  className?: string;
  /*+*/
  /** Содержимое карточки (футер/боковая часть), может быть пустым */
  contentSlot?: React.ReactNode;
  /*+*/
  /** Описание карточки */
  description: React.ReactNode;
  /*+*/
  /** URL изображения */
  image: string;
  imageAlt?: string;
  /*+*/
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
  /*+*/
  /** Заголовок карточки */
  title: React.ReactNode;/*+*/
};

const Card: React.FC<CardProps> = (props) => (
  <div className={cn(props.className, styles.card)} onClick={props.onClick}>
    {props.image ? (
      <Image
        src={props.image}
        alt={props.imageAlt ?? ''}
        width={272}
        height={272}
        style={{ backgroundColor: 'transparent', width: '100%', height: 'auto' }}
      />
    ) : (
      <div style={{ width: '100%', height: 272, backgroundColor: '#e0e0e0' }} />
    )}
    <div className={styles.card__text}>
      <div className={styles.caption}>{props.captionSlot}</div>
      <Text maxLines={2} weight={'medium'} view={'p-20'} tag={'h3'}>
        {props.title}
      </Text>
      <Text maxLines={3} color={'secondary'}>
        {props.description}
      </Text>
    </div>
    <div className={styles.card__bottom}>
      <Text weight={'bold'} className={styles.contentSlot}>
        {props.contentSlot}
      </Text>
      {props.actionSlot}
    </div>
  </div>
)

export default Card
