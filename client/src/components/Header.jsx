import React from 'react';
import { headerStyles, currentVersion } from '../styles/headerStyles';

const Header = () => {
    const styles = headerStyles[currentVersion];

    return (
        <header className={styles.container}>
            <div className={styles.innerContainer}>
                <div className={styles.flexContainer}>
                    <div className={styles.titleContainer}>
                        <div>
                            <span className={styles.mainTitle}>Magnificent Worldwide</span>
                        </div>
                        <div className={styles.subTitle}>
                            Marketing & Sales Group <span className={styles.teamText}>--</span> Team 25,000
                        </div>
                    </div>
                    <div className={styles.logoContainer}>
                        <div className="flex items-center gap-2">
                            <div className={styles.logoText}>
                                <span className={styles.logoTextTalk}>TALK</span>
                                <span className={styles.logoTextFusion}>FUSION</span>
                            </div>
                            <img
                                src="/talkfusion-logo.svg"
                                alt="Talk Fusion"
                                className="h-8 w-auto ml-2"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header; 