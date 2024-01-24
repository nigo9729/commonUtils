import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import icon1 from '@site/static/img/logo.png';
import icon2 from '@site/static/img/logo.png';
import icon3 from '@site/static/img/logo.png';

type FeatureItem = {
  title: string;
  img: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: '纯JS依赖',
    img: icon1,
    description: (
      <>跨平台，纯JS依赖，无需安装任何其他依赖，支持浏览器和Node.js环境。</>
    ),
  },
  {
    title: '完整测试',
    img: icon2,
    description: <>完善的测试用例，覆盖率达到100%，保证代码质量。</>,
  },
  {
    title: '轻量化',
    img: icon3,
    description: <>体积小，代码简洁，无副作用，可靠性高，可用于任何项目。</>,
  },
];

function Feature({ title, img, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className='text--center'>
        <img className={styles.featureSvg} role='img' src={img} />
      </div>
      <div className='text--center padding-horiz--md'>
        <Heading as='h3'>{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className='container'>
        <div className='row'>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
