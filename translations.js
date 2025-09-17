// ===== EVANGELION LANGUAGE SYSTEM =====

// All website translations
const translations = {
    // Japanese - Default Language
    jp: {
        // Main navigation
        'nav-intro': 'イントロ',
        'nav-overview': '概要',
        'nav-pilots': 'パイロット',
        'nav-units': 'ユニット',
        'nav-archive': 'アーカイブ',
        'nav-map': 'マップ',
        'nav-report': 'レポート',

        // Intro section
        'sync-status': 'パイロット入力待機中',
        'initiate-sync': 'シンクロ開始',
        'sync-ratio': 'シンクロ率:',
        'neural-link': 'ニューラルリンク:',
        'at-field': 'A.T.フィールド:',
        'standby': '待機',
        'inactive': '非活性',
        'synchronization-progress': 'シンクロナイゼーション進行中',
        'synchronization-complete': 'シンクロナイゼーション完了',
        'connecting': '接続中',
        'active': '活性',
        'deploying': '展開中',

        // Hero section
        'enter-world': '世界に入る',
        'neon-genesis': 'ネオン・ジェネシス',
        'evangelion': 'エヴァンゲリオン',

        // Synopsis section
        'series-overview': 'シリーズ概要',
        'synopsis-text': '2015年、世界は黙示録の瀬戸際に立っている。「使徒」と呼ばれる謎の存在が人類の存在を脅かし、巨大なバイオメカニカルメカ「エヴァンゲリオン」だけが彼らに立ち向かうことができる。14歳の碇シンジは、影の組織NERVのためにエヴァンゲリオン初号機を操縦するよう父に嫌々ながら募集される。しかし、シンジが巨大ロボットと宇宙的恐怖のこの世界を深く掘り下げるにつれて、救済と破滅の境界線は彼が想像していたよりもはるかに薄いことを発見する。',

        // Characters section
        'characters': 'キャラクター',
        'shinji-ikari': '碇シンジ',
        'pilot': 'パイロット',
        'rei-ayanami': '綾波レイ',
        'asuka-langley': '惣流・アスカ・ラングレー',
        'gendo-ikari': '碇ゲンドウ',
        'commander': '司令官',
        'misato-katsuragi': '葛城ミサト',
        'major': '少佐',
        'kaworu-nagisa': '渚カヲル',
        'angel': '使徒',
        'ryoji-kaji': '加持リョウジ',
        'agent': 'エージェント',
        'ritsuko-akagi': '赤木リツコ',
        'scientist': '科学者',
        'select-character': 'キャラクターを選択',
        'click-character-info': '上のキャラクターをクリックして情報を表示',
        'age': '年齢:',
        'role': '役割:',

        // Character roles
        'shinji-role': 'サード・チルドレン / EVA-01パイロット',
        'rei-role': 'ファースト・チルドレン / EVA-00パイロット',
        'asuka-role': 'セカンド・チルドレン / EVA-02パイロット',
        'gendo-role': 'NERV司令官',
        'misato-role': '作戦部長',
        'kaworu-role': 'フィフス・チルドレン / 第17使徒',
        'ryoji-role': 'NERV特務検査官 / スパイ',
        'ritsuko-role': '主任科学者 / EVA開発者',

        // Characters descriptions
        'shinji-description': '人類の救世主の役割に押し込まれた不本意な十代。うつ病、見捨てられることへの不安、エヴァンゲリオン初号機を操縦する重圧に苦しんでいる。',
        'rei-description': 'エヴァンゲリオン零号機を操縦する謎めいて静かな少女。彼女の謎めいた性質は、人類補完計画との深いつながりを隠している。',
        'asuka-description': 'ドイツ出身の誇り高く競争心の強いパイロット。彼女の外向的な性格は、深い不安感とトラウマ的な過去を隠している。',
        'gendo-description': 'シンジの疎遠な父でありNERVの司令官。冷淀で計算高い男で、最終的な目標は人類補完計画を通して亡くなった妻と再会することである。',
        'misato-description': 'シンジとアスカの保護者を務める若い女性。カジュアルな態度にもかかわらず、彼女はセカンドインパクトの記憶に悩まされている熟練した戦術家である。',
        'kaworu-description': '人間の姿をとって現れる最後の使徒。シンジとの関係がシリーズの結論において重要になる。',
        'ryoji-description': '複数の組織のために働く謎の三重スパイ。ミサトの元恋人であり、NERVの真の議題と人類補完計画を調査する重要人物。',
        'ritsuko-description': 'NERVの主任科学者でエヴァンゲリオンユニットの主任開発者。故赤木ナオコ博士の娘で、MAGIコンピューターシステムを維持し、自分の仕事について複雑な感情を抱いている。',

        // Eva section
        'evangelion-units': 'エヴァンゲリオンユニット',
        'eva-designation': '機体名:',
        'eva-pilot': 'パイロット:',
        'eva-status': 'ステータス:',
        'eva-sync-ratio': 'シンクロ率:',
        'eva-at-field': 'A.T.フィールド:',
        'eva-entry-plug': 'エントリープラグ:',
        'classified': '[機密]',
        'unit-02': 'ユニット-02',
        'unit-01': 'ユニット-01',
        'unit-00': 'ユニット-00',
        'eva-active': '活性',
        'eva-berserk': '暴走モード',
        'eva-prototype': 'プロトタイプ',
        'eva-operational': '運用中',
        'eva-unlimited': '無制限',
        'eva-stable': '安定',
        'lcl-filled': 'LCL充填',
        'lcl-saturated': 'LCL飽和',
        'lcl-optimal': 'LCL最適',

        // Footer
        'landmark-series': '記念碑的シリーズ',
        'redefined-anime': 'アニメを再定義した',
        'developer': '開発者',
        'academic-project': '学術プロジェクト',
        'programming-4': 'プログラミング 4',
        'educational-purposes': '教育目的で作成されました。',
        
        // Sync Overlay
        'sync-ratio': 'シンクロ率:',
        'neural-link': 'ニューラルリンク:',
        'at-field': 'A.T.フィールド:',
        'standby': 'スタンバイ',
        'inactive': '不活性',
        'awaiting-pilot': 'パイロット入力待機中',
        'initiate-sync': '同期開始',

        // Map page
        'tactical-map': '戦術マップシステム',
        'map-controls': 'マップコントロール:',
        'reset-view': 'ビューリセット',
        'satellite': '衛星',
        'terrain': '地形',
        'labels': 'ラベル',

        // Report page
        'mission-report': 'ミッションレポート',
        'classified-nerv': 'NERV機密データベース',
        'security-level': 'セキュリティレベル: 制限',
        'authorized-only': '許可された職員のみ',
        'enter-admin': '管理者として入力',

        // Episodes page
        'episode-archive': 'エピソードアーカイブ',
        'nerv-archive': 'NERVアーカイブ',
        'classified-database': '機密データベースアクセス',
        'episodes': 'エピソード',
        'gallery': 'ギャラリー',
        'episodes-unlocked': 'アンロックされたエピソード:',
        'episodes-watched': '視聴済みエピソード:',
        'total-episodes': '総エピソード数:',
        'mark-watched': '視聴済みにマーク',
        'mark-unwatched': '未視聴にマーク',
        'episode-locked': 'エピソードロック済み',
        'all-images': '全画像',
        'pilots': 'パイロット',
        'units': 'ユニット',

        // Map page
        'tactical-map': 'タクティカルマップシステム',
        'map-controls': 'マップコントロール:',
        'reset-view': 'ビューリセット',
        'satellite': 'サテライト',
        'terrain': '地形',
        'labels': 'ラベル',
        'coordinates': '座標:',
        'zoom': 'ズーム:',
        'status': 'ステータス:',
        'tactical-overview': 'タクティカル概要',
        'nerv-headquarters': 'NERV本部',
        'retractable-city': '格納可能な都市',
        'at-field-barriers': 'A.T.フィールドバリア',
        'nerv-hq-desc': '東京-3の地下深くに隠された巨大な地下要塞で、エヴァンゲリオンユニットと謎のセントラルドグマを収容している。',
        'retractable-desc': '東京-3の建物は使徒の攻撃時に地面に格納でき、都市をエヴァンゲリオンの戦場に変えることができる。',
        'at-barriers-desc': '都市は強力なA.T.フィールドバリアによって保護されているが、エヴァンゲリオンだけが使徒の独自のA.T.フィールドを貫通できる。',
        'emergency': '緊急事態',
        'warning': '警告',
        'blood-type-blue': 'ブラッドタイプ: ブルー',
        'angel-identified': '使徒',
        'identified': '確認済み',
        'magi-code': 'MAGI-1-2-3',
        'nerv-classification': 'NERV分類',
        'evangelion-project': 'エヴァンゲリオンプロジェクト',
        'nerv-systems': 'NERV。全システム稼働中。',

        // Report page
        'mission-report': 'ミッション報告',
        'classified-nerv': '機密NERVデータベース',
        'security-level': 'セキュリティレベル: 制限',
        'authorized-personnel': '認可された職員のみ',
        'enter-administrator': '管理者として入力',
        'admin-session': '管理者セッション活性',
        'terminal-id': 'ターミナル_ID: MAGI-01',
        'pilot-evaluation': 'パイロット評価フォーム',
        'access-granted': 'アクセス許可',
        'pilot-designation': 'パイロット指定',
        'pilot-name-placeholder': 'パイロット名を入力...',
        'sync-ratio-select': 'シンクロナイゼーション率 (1-10)',
        'select-sync': 'シンクロ率を選択',
        'perfect-sync': '10 - 完全なシンクロナイゼーション',
        'exceptional-performance': '9 - 優れたパフォーマンス',
        'superior-compatibility': '8 - 優れた互換性',
        'above-average': '7 - 平均以上のシンクロ',
        'acceptable-performance': '6 - 許容できるパフォーマンス',
        'standard-baseline': '5 - 標準ベースライン',
        'below-expectations': '4 - 期待を下回る',
        'poor-sync': '3 - 貧弱なシンクロナイゼーション',
        'critical-issues': '2 - 重大な問題',
        'system-rejection': '1 - システム拒否',
        'mission-details': 'ミッション報告詳細',
        'mission-placeholder': '詳細なミッション分析とパイロット評価を入力...',
        'transmit-magi': 'MAGIシステムに送信',
        'classification': '分類:',
        'top-secret': '極秘',
        'clearance': 'クリアランス:',
        'level-7': 'レベル7',
        'location': '場所:',
        'tokyo-3': '東京-3'
    },

    // Spanish - Target Language
    es: {
        // Main navigation
        'nav-intro': 'INTRO',
        'nav-overview': 'VISIÓN GENERAL',
        'nav-pilots': 'PILOTOS',
        'nav-units': 'UNIDADES',
        'nav-archive': 'ARCHIVO',
        'nav-map': 'MAPA',
        'nav-report': 'REPORTE',

        // Intro section
        'sync-status': 'ESPERANDO ENTRADA DE PILOTO',
        'initiate-sync': 'INICIAR SINCRONIZACIÓN',
        'sync-ratio': 'RATIO SINC:',
        'neural-link': 'ENLACE NEURAL:',
        'at-field': 'CAMPO A.T.:',
        'standby': 'EN ESPERA',
        'inactive': 'INACTIVO',
        'synchronization-progress': 'SINCRONIZACIÓN EN PROGRESO',
        'synchronization-complete': 'SINCRONIZACIÓN COMPLETA',
        'connecting': 'CONECTANDO',
        'active': 'ACTIVO',
        'deploying': 'DESPLEGANDO',

        // Hero section
        'enter-world': 'ENTRAR AL MUNDO',
        'neon-genesis': 'NEON GENESIS',
        'evangelion': 'EVANGELION',

        // Synopsis section
        'series-overview': 'VISIÓN GENERAL DE LA SERIE',
        'synopsis-text': 'En el año 2015, el mundo se encuentra al borde del apocalipsis. Seres misteriosos conocidos como "Ángeles" amenazan la existencia de la humanidad, y solo los Evangelions - mecha bio-mecánicos masivos - pueden enfrentarlos. Shinji Ikari, de catorce años, es reclutado a regañadientes por su padre para pilotar la Unidad-01 de Evangelion para la organización sombría NERV. Pero a medida que Shinji se adentra más en este mundo de robots gigantes y horrores cósmicos, descubre que la línea entre salvación y destrucción es más delgada de lo que jamás imaginó.',

        // Characters section
        'characters': 'PERSONAJES',
        'shinji-ikari': 'SHINJI IKARI',
        'pilot': 'PILOTO',
        'rei-ayanami': 'REI AYANAMI',
        'asuka-langley': 'ASUKA LANGLEY',
        'gendo-ikari': 'GENDO IKARI',
        'commander': 'COMANDANTE',
        'misato-katsuragi': 'MISATO KATSURAGI',
        'major': 'MAYOR',
        'kaworu-nagisa': 'KAWORU NAGISA',
        'angel': 'ÁNGEL',
        'ryoji-kaji': 'RYOJI KAJI',
        'agent': 'AGENTE',
        'ritsuko-akagi': 'RITSUKO AKAGI',
        'scientist': 'CIENTÍFICA',
        'select-character': 'SELECCIONA UN PERSONAJE',
        'click-character-info': 'Haz clic en un personaje arriba para ver su información',
        'age': 'EDAD:',
        'role': 'ROL:',

        // Character roles
        'shinji-role': 'TERCER HIJO / PILOTO EVA-01',
        'rei-role': 'PRIMER HIJO / PILOTO EVA-00',
        'asuka-role': 'SEGUNDO HIJO / PILOTO EVA-02',
        'gendo-role': 'COMANDANTE NERV',
        'misato-role': 'DIRECTORA DE OPERACIONES',
        'kaworu-role': 'QUINTO HIJO / DECIMOSÉPTIMO ÁNGEL',
        'ryoji-role': 'INSPECTOR ESPECIAL NERV / ESPÍA',
        'ritsuko-role': 'CIENTÍFICA JEFE / DESARROLLADORA EVA',

        // Characters descriptions
        'shinji-description': 'Un adolescente reacio empujado al papel de salvador de la humanidad. Lucha contra la depresión, problemas de abandono y el peso de pilotar la Unidad-01 de Evangelion.',
        'rei-description': 'Una chica misteriosa y callada que pilota la Unidad-00 de Evangelion. Su naturaleza enigmática oculta conexiones profundas con el Proyecto de Instrumentalidad Humana.',
        'asuka-description': 'Una piloto orgullosa y competitiva de Alemania. Su personalidad extrovertida enmascara profundas inseguridades y un pasado traumático.',
        'gendo-description': 'El padre distanciado de Shinji y comandante de NERV. Un hombre frío y calculador cuyo objetivo final es reunirse con su esposa fallecida a través del Proyecto de Instrumentalidad Humana.',
        'misato-description': 'Una mujer joven que sirve como guardiana de Shinji y Asuka. A pesar de su comportamiento casual, es una táctica hábil atormentada por recuerdos del Segundo Impacto.',
        'kaworu-description': 'El Ángel final en aparecer, que toma forma humana. Su relación con Shinji se vuelve fundamental para la conclusión de la serie.',
        'ryoji-description': 'Un misterioso triple agente que trabaja para múltiples organizaciones. Ex amante de Misato y figura clave investigando la verdadera agenda de NERV y el Proyecto de Instrumentalidad Humana.',
        'ritsuko-description': 'Científica jefe de NERV y desarrolladora principal de las unidades Evangelion. Hija de la fallecida Dra. Naoko Akagi, mantiene el sistema informático MAGI y alberga sentimientos complejos sobre su trabajo.',

        // Eva section
        'evangelion-units': 'UNIDADES EVANGELION',
        'eva-designation': 'DESIGNACIÓN:',
        'eva-pilot': 'PILOTO:',
        'eva-status': 'ESTADO:',
        'eva-sync-ratio': 'RATIO SINC:',
        'eva-at-field': 'CAMPO A.T.:',
        'eva-entry-plug': 'TAPÓN DE ENTRADA:',
        'classified': '[CLASIFICADO]',
        'unit-02': 'UNIDAD-02',
        'unit-01': 'UNIDAD-01',
        'unit-00': 'UNIDAD-00',
        'eva-active': 'ACTIVO',
        'eva-berserk': 'MODO BERSERKER',
        'eva-prototype': 'PROTOTIPO',
        'eva-operational': 'OPERACIONAL',
        'eva-unlimited': 'ILIMITADO',
        'eva-stable': 'ESTABLE',
        'lcl-filled': 'LCL LLENO',
        'lcl-saturated': 'LCL SATURADO',
        'lcl-optimal': 'LCL ÓPTIMO',

        // Footer
        'landmark-series': 'Una serie icónica',
        'redefined-anime': 'que redefinió el anime',
        'developer': 'DESARROLLADOR',
        'academic-project': 'PROYECTO ACADÉMICO',
        'programming-4': 'Programación 4',
        'educational-purposes': 'Creado con fines educativos.',
        
        // Sync Overlay
        'sync-ratio': 'PROPORCIÓN DE SINCRONIZACIÓN:',
        'neural-link': 'ENLACE NEURAL:',
        'at-field': 'CAMPO A.T.:',
        'standby': 'ESPERA',
        'inactive': 'INACTIVO',
        'awaiting-pilot': 'ESPERANDO ENTRADA DEL PILOTO',
        'initiate-sync': 'INICIAR SINCRONIZACIÓN',

        // Map page
        'tactical-map': 'SISTEMA DE MAPA TÁCTICO',
        'map-controls': 'CONTROLES DEL MAPA:',
        'reset-view': 'RESTABLECER VISTA',
        'satellite': 'SATÉLITE',
        'terrain': 'TERRENO',
        'labels': 'ETIQUETAS',

        // Report page
        'mission-report': 'INFORME DE MISIÓN',
        'classified-nerv': 'BASE DE DATOS CLASIFICADA NERV',
        'security-level': 'NIVEL DE SEGURIDAD: RESTRINGIDO',
        'authorized-only': 'SOLO PERSONAL AUTORIZADO',
        'enter-admin': 'INGRESAR COMO ADMINISTRADOR',

        // Episodes page
        'episode-archive': 'Archivo de Episodios',
        'nerv-archive': 'ARCHIVO NERV',
        'classified-database': 'ACCESO A BASE DE DATOS CLASIFICADA',
        'episodes': 'EPISODIOS',
        'gallery': 'GALERÍA',
        'episodes-unlocked': 'EPISODIOS DESBLOQUEADOS:',
        'episodes-watched': 'EPISODIOS VISTOS:',
        'total-episodes': 'EPISODIOS TOTALES:',
        'mark-watched': 'Marcar como visto',
        'mark-unwatched': 'Marcar como no visto',
        'episode-locked': 'Episodio bloqueado',
        'all-images': 'TODAS LAS IMÁGENES',
        'pilots': 'PILOTOS',
        'units': 'UNIDADES',

        // Map page
        'tactical-map': 'SISTEMA DE MAPA TÁCTICO',
        'map-controls': 'CONTROLES DE MAPA:',
        'reset-view': 'RESETEAR VISTA',
        'satellite': 'SATÉLITE',
        'terrain': 'TERRENO',
        'labels': 'ETIQUETAS',
        'coordinates': 'COORDENADAS:',
        'zoom': 'ZOOM:',
        'status': 'ESTADO:',
        'tactical-overview': 'VISIÓN TÁCTICA',
        'nerv-headquarters': 'CUARTEL GENERAL NERV',
        'retractable-city': 'CIUDAD RETRÁCTIL',
        'at-field-barriers': 'BARRERAS DE CAMPO A.T.',
        'nerv-hq-desc': 'Oculto en las profundidades bajo Tokyo-3, la fortaleza subterránea masiva alberga las unidades Evangelion y el misterioso Dogma Central.',
        'retractable-desc': 'Los edificios de Tokyo-3 pueden retraerse en el suelo durante ataques de Ángeles, transformando la ciudad en un campo de batalla para los Evangelions.',
        'at-barriers-desc': 'La ciudad está protegida por poderosas barreras de Campo A.T., pero solo los Evangelions pueden penetrar los Campos A.T. propios de los Ángeles.',
        'emergency': 'EMERGENCIA',
        'warning': 'ADVERTENCIA',
        'blood-type-blue': 'TIPO DE SANGRE: AZUL',
        'angel-identified': 'ÁNGEL',
        'identified': 'IDENTIFICADO',
        'magi-code': 'MAGI-1-2-3',
        'nerv-classification': 'CLASIFICACIÓN NERV',
        'evangelion-project': 'PROYECTO EVANGELION',
        'nerv-systems': 'NERV. Todos los sistemas operacionales.',

        // Report page
        'mission-report': 'REPORTE DE MISIÓN',
        'classified-nerv': 'BASE DE DATOS CLASIFICADA NERV',
        'security-level': 'NIVEL DE SEGURIDAD: RESTRINGIDO',
        'authorized-personnel': 'SOLO PERSONAL AUTORIZADO',
        'enter-administrator': 'ENTRAR COMO ADMINISTRADOR',
        'admin-session': 'SESIÓN DE ADMINISTRADOR ACTIVA',
        'terminal-id': 'ID_TERMINAL: MAGI-01',
        'pilot-evaluation': 'FORMULARIO DE EVALUACIÓN DE PILOTO',
        'access-granted': 'ACCESO CONCEDIDO',
        'pilot-designation': 'DESIGNACIÓN DE PILOTO',
        'pilot-name-placeholder': 'Ingresar nombre del piloto...',
        'sync-ratio-select': 'RATIO DE SINCRONIZACIÓN (1-10)',
        'select-sync': 'Seleccionar Ratio Sinc',
        'perfect-sync': '10 - Sincronización Perfecta',
        'exceptional-performance': '9 - Rendimiento Excepcional',
        'superior-compatibility': '8 - Compatibilidad Superior',
        'above-average': '7 - Sinc Por Encima del Promedio',
        'acceptable-performance': '6 - Rendimiento Aceptable',
        'standard-baseline': '5 - Línea Base Estándar',
        'below-expectations': '4 - Por Debajo de las Expectativas',
        'poor-sync': '3 - Sincronización Pobre',
        'critical-issues': '2 - Problemas Críticos',
        'system-rejection': '1 - Rechazo del Sistema',
        'mission-details': 'DETALLES DEL REPORTE DE MISIÓN',
        'mission-placeholder': 'Ingresar análisis detallado de misión y evaluación del piloto...',
        'transmit-magi': 'TRANSMITIR AL SISTEMA MAGI',
        'classification': 'CLASIFICACIÓN:',
        'top-secret': 'ALTO SECRETO',
        'clearance': 'AUTORIZACIÓN:',
        'level-7': 'NIVEL 7',
        'location': 'UBICACIÓN:',
        'tokyo-3': 'TOKYO-3'
    }
};

// Language system
class LanguageSystem {
    constructor() {
        this.currentLanguage = 'jp'; // Start with Japanese
        this.isAnimating = false;
        this.translations = translations; // Assign global translations object
        this.glitchChars = ['01', '10', '11', '00', '█', '▄', '▀', '░', '▒', '▓', '■', '□', '▲', '▼', '◄', '►', '○', '●', '◦', '‣', '※', '∴', '∵', '⚡', '⟨', '⟩', '〈', '〉', '『', '』', '「', '」', 'Ａ', 'Ｂ', 'Ｃ', '①', '②', '③', '⠀', '⠁', '⠃', '⠇', '⠏', '⠟', '⠿', '⡿', '⣿'];
        this.init();
    }

    init() {
        this.addLanguageAttributes();
        this.setupGlitchTransition();
        this.setupSectionObserver();
        
        // Add keyboard shortcut for manual trigger (L for Language)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'l' || e.key === 'L') {
                if (!this.isAnimating) {
                    this.triggerGlitchTransition();
                }
            }
        });
    }

    // Add data attributes to all translatable elements
    addLanguageAttributes() {
        const translatableElements = [
            // Navigation
            { selector: 'a[href="#hero"]', key: 'nav-intro' },
            { selector: 'a[href="#synopsis"], a[href="index.html#synopsis"]', key: 'nav-overview' },
            { selector: 'a[href="#characters"], a[href="index.html#characters"]', key: 'nav-pilots' },
            { selector: 'a[href="#evas"], a[href="index.html#evas"]', key: 'nav-units' },
            { selector: 'a[href="episodes.html"]', key: 'nav-archive' },
            { selector: 'a[href="map.html"]', key: 'nav-map' },
            { selector: 'a[href="report.html"]', key: 'nav-report' },

            // Intro section
            { selector: '.status-text', key: 'sync-status' },
            { selector: '.intro-start-btn .btn-text', key: 'initiate-sync' },
            { selector: '#ctaButton', key: 'enter-world' },

            // Hero section
            { selector: '.subtitle', key: 'neon-genesis' },

            // Synopsis section
            { selector: '.synopsis-section .section-title', key: 'series-overview' },
            { selector: '.synopsis-text', key: 'synopsis-text' },

            // Characters section
            { selector: '.character-gallery .section-title', key: 'characters' },
            { selector: '#infoName', key: 'select-character' },
            { selector: '#infoDescription', key: 'click-character-info' },
            { selector: '.stat-label', key: 'age', index: 0 },
            { selector: '.stat-label', key: 'role', index: 1 },

            // Eva section
            { selector: '.eva-section .section-title', key: 'evangelion-units' },

            // Footer
            { selector: '.footer-section p', key: 'redefined-anime', index: 0 },
            { selector: '.footer-section h3', key: 'developer', index: 1 },
            { selector: '.footer-section h3', key: 'academic-project', index: 2 },
            { selector: '.footer-section p', key: 'programming-4', index: 1 },
            { selector: '.footer-bottom p', key: 'educational-purposes' },
            
            // Sync Overlay (already have data-translate, but need to be registered)
            { selector: '.label[data-translate="sync-ratio"]', key: 'sync-ratio' },
            { selector: '.label[data-translate="neural-link"]', key: 'neural-link' },
            { selector: '.label[data-translate="at-field"]', key: 'at-field' },
            { selector: '.value[data-translate="standby"]', key: 'standby' },
            { selector: '.value[data-translate="inactive"]', key: 'inactive' },
            { selector: '.status-text[data-translate="awaiting-pilot"]', key: 'awaiting-pilot' },
            { selector: '.btn-text[data-translate="initiate-sync"]', key: 'initiate-sync' },

            // Episodes page
            { selector: '.library-title', key: 'nerv-archive' },
            { selector: '.library-subtitle', key: 'classified-database' },
            { selector: '.tab-text', key: 'episodes', index: 0 },
            { selector: '.tab-text', key: 'gallery', index: 1 },
            { selector: '.stat-label[data-translate="episodes-unlocked"]', key: 'episodes-unlocked' },
            { selector: '.stat-label[data-translate="episodes-watched"]', key: 'episodes-watched' },
            { selector: '.stat-label[data-translate="total-episodes"]', key: 'total-episodes' },
            { selector: '#dialogWatchText', key: 'mark-watched' },

            // Map page
            { selector: '.map-title', key: 'tactical-map' },
            { selector: '.controls-title', key: 'map-controls' },
            { selector: '.info-panel h3', key: 'tactical-overview' },

            // Report page
            { selector: '.report-title', key: 'mission-report' },
            { selector: '.report-subtitle', key: 'classified-nerv' },
            { selector: '.modal-title', key: 'pilot-evaluation' }
        ];

        translatableElements.forEach(({ selector, key, page, index }) => {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                const element = index !== undefined ? elements[index] : elements[0];
                if (element && (!page || window.location.pathname.includes(page))) {
                    element.setAttribute('data-translate', key);
                }
            }
        });

        // Set initial Japanese text
        this.updateLanguage('jp');
    }

    // Setup the individual text glitch system
    setupGlitchTransition() {
        // Add CSS for individual element glitch effects
        this.addGlitchStyles();
    }

    // Setup Intersection Observer to trigger translations per section
    setupSectionObserver() {
        // Immediately translate navigation since it's always visible
        const nav = document.querySelector('.page-nav');
        if (nav) {
            this.translateSection(nav);
        }
        
        // Immediately translate intro overlay since it's visible on page load
        const introOverlay = document.querySelector('.intro-overlay');
        if (introOverlay) {
            this.translateSection(introOverlay);
        }
        
        // Define sections based on page content - only observe sections that exist
        const allPossibleSections = [
            '.intro-overlay', // Intro overlay with sync interface - index.html
            '.hero-section', // Hero section (after video) - index.html
            '.synopsis-section', // Synopsis - index.html
            '.character-gallery', // Characters - index.html
            '.eva-section', // EVA Units - index.html
            '.episodes-library-header', // Episodes header - episodes.html
            '.episodes-library', // Episodes content - episodes.html
            '.map-section', // Map section - map.html
            '.report-header', // Report header - report.html
            '.footer' // Footer - all pages
        ];
        
        // Only include sections that actually exist on this page
        const sectionSelectors = allPossibleSections.filter(selector => {
            const exists = document.querySelector(selector) !== null;
            if (exists) {
            }
            return exists;
        });

        // Create intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                
                if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                    // Check if this section hasn't been translated yet
                    const section = entry.target;
                    if (!section.hasAttribute('data-translated')) {
                        this.translateSection(section);
                        section.setAttribute('data-translated', 'true');
                    }
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of section is visible
        });

        // Observe each existing section
        sectionSelectors.forEach(selector => {
            const section = document.querySelector(selector);
            observer.observe(section);
        });

        // Store observer for cleanup if needed
        this.sectionObserver = observer;
    }

    // Add CSS styles for the glitch effect
    addGlitchStyles() {
        const style = document.createElement('style');
        style.textContent = `

            .language-transition {
                animation: language-text-glitch 0.3s ease-in-out;
                pointer-events: none;
            }

            @keyframes language-text-glitch {
                0% { 
                    transform: translateX(0) skew(0deg);
                    opacity: 1;
                    filter: blur(0px);
                }
                10% {
                    transform: translateX(-3px) skew(-2deg);
                    opacity: 0.9;
                    color: var(--warning-yellow);
                    text-shadow: 3px 0 var(--primary-red), -3px 0 var(--terminal-green);
                    filter: blur(0.5px);
                }
                20% {
                    transform: translateX(4px) skew(3deg);
                    opacity: 0.7;
                    color: var(--primary-red);
                    text-shadow: -2px 0 var(--warning-yellow), 2px 0 var(--terminal-green);
                    filter: blur(1px) contrast(1.5);
                }
                30% {
                    transform: translateX(-2px) skew(-1deg);
                    opacity: 0.5;
                    color: var(--warning-yellow);
                    text-shadow: 4px 0 var(--primary-red), -4px 0 var(--terminal-green);
                    filter: blur(1.5px) saturate(2);
                }
                40% {
                    transform: translateX(5px) skew(2deg);
                    opacity: 0.3;
                    color: var(--terminal-green);
                    text-shadow: -3px 0 var(--warning-yellow), 3px 0 var(--primary-red);
                    filter: blur(2px) brightness(1.5);
                }
                50% {
                    transform: translateX(-4px) skew(-3deg);
                    opacity: 0.2;
                    color: var(--primary-red);
                    text-shadow: 5px 0 var(--terminal-green), -5px 0 var(--warning-yellow);
                    filter: blur(2.5px) hue-rotate(180deg);
                }
                60% {
                    transform: translateX(3px) skew(1deg);
                    opacity: 0.4;
                    color: var(--warning-yellow);
                    text-shadow: -4px 0 var(--primary-red), 4px 0 var(--terminal-green);
                    filter: blur(2px) contrast(2);
                }
                70% {
                    transform: translateX(-1px) skew(-0.5deg);
                    opacity: 0.6;
                    color: var(--terminal-green);
                    text-shadow: 2px 0 var(--primary-red), -2px 0 var(--warning-yellow);
                    filter: blur(1.5px);
                }
                80% {
                    transform: translateX(2px) skew(0.5deg);
                    opacity: 0.8;
                    color: var(--terminal-green);
                    text-shadow: 1px 0 var(--primary-red), -1px 0 var(--warning-yellow);
                    filter: blur(1px);
                }
                90% {
                    transform: translateX(-1px) skew(0deg);
                    opacity: 0.9;
                    color: var(--terminal-green);
                    text-shadow: 0 0 10px var(--terminal-green);
                    filter: blur(0.5px);
                }
                100% {
                    transform: translateX(0) skew(0deg);
                    opacity: 1;
                    color: var(--terminal-green);
                    text-shadow: 0 0 5px var(--terminal-green);
                    filter: blur(0px);
                }
            }

            .element-glitch-active {
                animation: language-text-glitch 0.8s ease-in-out;
                position: relative;
                z-index: 1000;
            }

            .element-glitch-active::before,
            .element-glitch-active::after {
                content: attr(data-glitch-text);
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: 0.8;
                z-index: -1;
            }

            .element-glitch-active::before {
                animation: glitch-clone-1 0.8s ease-in-out;
                color: var(--primary-red);
                text-shadow: 2px 0 var(--primary-red);
            }

            .element-glitch-active::after {
                animation: glitch-clone-2 0.8s ease-in-out;
                color: var(--terminal-green);
                text-shadow: -2px 0 var(--terminal-green);
            }

            @keyframes glitch-clone-1 {
                0%, 100% { transform: translateX(0); opacity: 0; }
                20% { transform: translateX(-2px); opacity: 0.8; }
                40% { transform: translateX(3px); opacity: 0.6; }
                60% { transform: translateX(-1px); opacity: 0.4; }
                80% { transform: translateX(1px); opacity: 0.2; }
            }

            @keyframes glitch-clone-2 {
                0%, 100% { transform: translateX(0); opacity: 0; }
                25% { transform: translateX(2px); opacity: 0.7; }
                45% { transform: translateX(-3px); opacity: 0.5; }
                65% { transform: translateX(1px); opacity: 0.3; }
                85% { transform: translateX(-1px); opacity: 0.1; }
            }

            .screen-flash {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(255, 255, 255, 0.1);
                pointer-events: none;
                z-index: 9999;
                opacity: 0;
                animation: flash-effect 0.1s ease-out;
            }

            @keyframes flash-effect {
                0% { opacity: 0; }
                50% { opacity: 1; }
                100% { opacity: 0; }
            }

            .element-corruption {
                position: relative;
                overflow: hidden;
            }

            .element-corruption::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 51, 0, 0.3), transparent);
                animation: scan-line 0.8s ease-in-out;
                z-index: 1;
            }

            @keyframes scan-line {
                0% { left: -100%; }
                100% { left: 100%; }
            }

            @media (max-width: 768px) {
                .glitch-text-layer {
                    font-size: 2.5rem;
                }
            }

            @media (max-width: 480px) {
                .glitch-text-layer {
                    font-size: 2rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Trigger the real-time translation glitch system
    // Translate a specific section
    async translateSection(section) {
        if (this.currentLanguage === 'es') {
            return;
        }
        
        
        // Find all translatable elements within this section
        const elements = section.querySelectorAll('[data-translate]');
        if (elements.length === 0) {
            return;
        }
        
        await this.performSectionTransition(elements);
    }

    async triggerGlitchTransition() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        
        // Directly start the page translation without overlay
        await this.performPageTransition();

        this.isAnimating = false;
    }

    // Perform section-based translation with element glitching
    async performSectionTransition(elements) {
        const elementsArray = Array.from(elements);
        
        
        // Create array of promises for simultaneous element processing
        const promises = elementsArray.map((element, index) => {
            const translateKey = element.getAttribute('data-translate');
            const originalText = element.textContent.trim();
            const targetText = this.translations.es[translateKey] || originalText;
            
            // Determine element characteristics for glitch intensity
            const isLargeText = originalText.length > 20;
            const isPrimary = ['h1', 'h2', 'h3'].includes(element.tagName.toLowerCase());
            const intensity = isPrimary ? 0.8 : 0.6;
            
            return this.glitchElementTransition(element, originalText, targetText, {
                intensity,
                isLargeText,
                isPrimary,
                index
            });
        });
        
        // Execute all element transitions simultaneously
        await Promise.all(promises);
        
    }

    // Perform the actual page translation with element glitching
    async performPageTransition() {
        const translatableElements = document.querySelectorAll('[data-translate]');
        const elementsArray = Array.from(translatableElements);

        // Process all elements simultaneously for synchronized translation
        const promises = [];
        
        elementsArray.forEach((element, i) => {
            const key = element.getAttribute('data-translate');
            const originalText = element.textContent;
            const targetText = translations.es[key];
            
            if (targetText) {
                // Set up glitch data attribute for CSS effects
                element.setAttribute('data-glitch-text', originalText);
                
                // Vary corruption intensity based on text length and position
                const corruptionIntensity = Math.min(0.8, originalText.length / 30);
                const isLargeText = originalText.length > 50;
                const isPrimaryElement = element.tagName === 'H1' || element.tagName === 'H2' || element.classList.contains('section-title');
                
                // Start all element glitches simultaneously
                const promise = this.glitchElementTransition(element, originalText, targetText, {
                    intensity: corruptionIntensity,
                    isLargeText: isLargeText,
                    isPrimary: isPrimaryElement,
                    index: i
                });
                
                promises.push(promise);
            }
        });
        
        // Wait for all elements to complete their transitions
        await Promise.all(promises);

        this.currentLanguage = 'es';
    }

    // Synchronized translation glitch effect
    async glitchElementTransition(element, originalText, targetText, options = {}) {
        const { intensity = 0.7, isLargeText = false, isPrimary = false, index = 0 } = options;
        
        // Small random delay to prevent completely synchronous start (looks more natural)
        const startDelay = Math.random() * 200;
        await this.delay(startDelay);
        
        // Phase 1: Add subtle scan line effect
        element.classList.add('element-corruption');
        
        // Phase 2: Start glitch effect with rare screen flash for primary elements only
        if (isPrimary && Math.random() < 0.4) { // Only flash important elements occasionally
            this.createScreenFlash();
        }
        element.classList.add('element-glitch-active');
        
        // Phase 3: Character-by-character corruption with natural feel
        await this.corruptTextEffect(element, originalText, targetText, intensity, isLargeText);
        
        // Phase 4: Brief complete corruption before final text (cleaner transition)
        const finalCorruption = this.generateCorruptedText(targetText);
        element.textContent = finalCorruption;
        await this.delay(100);
        
        // Phase 5: Set final text without additional flash (more natural)
        element.textContent = targetText;
        
        // Phase 6: Quick cleanup for natural feel
        const cleanupDelay = isLargeText ? 600 : 400; // Faster cleanup
        setTimeout(() => {
            element.classList.remove('element-glitch-active', 'language-transition', 'element-corruption');
            element.removeAttribute('data-glitch-text');
        }, cleanupDelay);
    }

    // Create screen flash effect
    createScreenFlash() {
        const flash = document.createElement('div');
        flash.className = 'screen-flash';
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.remove();
        }, 100);
    }

    // Character-by-character corruption effect with clean transition
    async corruptTextEffect(element, originalText, targetText, intensity = 0.7, isLargeText = false) {
        const maxLength = Math.max(originalText.length, targetText.length);
        const steps = isLargeText ? 16 : 10; // Slightly fewer steps for cleaner transition
        const baseDelay = isLargeText ? 45 : 65;
        
        for (let step = 0; step < steps; step++) {
            let corruptedText = '';
            const corruptionProgress = step / steps;
            const transitionPoint = 0.6; // Later transition point to avoid overlap
            
            for (let i = 0; i < maxLength; i++) {
                const charProgress = i / maxLength;
                const shouldShowTarget = corruptionProgress > transitionPoint && 
                                        charProgress < (corruptionProgress - transitionPoint) / (1 - transitionPoint);
                
                if (shouldShowTarget && i < targetText.length) {
                    // Clean transition: show target character
                    corruptedText += targetText[i];
                } else if (corruptionProgress > 0.2 && Math.random() < intensity * (1 - corruptionProgress * 0.5)) {
                    // Show corruption characters (avoid showing original text during corruption)
                    const charPool = step < steps * 0.4 ? 
                        this.glitchChars.slice(0, 16) : // Early: binary and blocks
                        this.glitchChars; // Later: all characters
                    corruptedText += charPool[Math.floor(Math.random() * charPool.length)];
                } else if (corruptionProgress < 0.3) {
                    // Early phase: show original with occasional corruption
                    if (Math.random() < 0.15) {
                        corruptedText += this.glitchChars[Math.floor(Math.random() * 8)];
                    } else {
                        corruptedText += originalText[i] || '';
                    }
                } else {
                    // Middle/late phase: prefer corruption over original to avoid overlap
                    corruptedText += this.glitchChars[Math.floor(Math.random() * this.glitchChars.length)];
                }
            }
            
            element.textContent = corruptedText;
            
            // Smooth timing progression
            const stepDelay = baseDelay + Math.random() * 20;
            const progressFactor = step > steps * 0.8 ? 1.3 : 1; // Slow down at the end
            await this.delay(stepDelay * progressFactor);
        }
    }

    // Generate corrupted/glitched text
    generateCorruptedText(originalText) {
        let corrupted = '';
        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() > 0.7) {
                corrupted += this.glitchChars[Math.floor(Math.random() * this.glitchChars.length)];
            } else {
                corrupted += originalText[i];
            }
        }
        return corrupted;
    }

    // Update all translatable elements to specified language
    updateLanguage(lang) {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (this.translations[lang] && this.translations[lang][key]) {
                element.textContent = this.translations[lang][key];
            }
        });
    }

    // Utility delay function
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Manual trigger for testing
    manualTrigger() {
        if (!this.isAnimating) {
            this.triggerGlitchTransition();
        }
    }
}

// Initialize the language system
let languageSystem;
document.addEventListener('DOMContentLoaded', function() {
    // Initialize with a small delay to ensure all content is loaded
    setTimeout(() => {
        languageSystem = new LanguageSystem();
        
        // Make it available globally for testing
        window.languageSystem = languageSystem;
        
    }, 500);
});
