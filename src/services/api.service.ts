
import { Injectable, signal } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  getProfile() {
    return of({
      name: 'DJ Ignito',
      handle: '@ignitobeats',
      avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsk8OsUQc1CeuYUGUOfJyA7tw57hOnkGOuRS9jWICmdvV-mGhJ4w7Ke7I63bUNPYsAvBnCleYLzqaLRTira2-eFuyRQSCXIp7yBqEJI0IPj0WjE8jWz1uF_owbQqPwXBIbwyNKsW9-y1bls14Bhfa4qIXgeOq93ayJVWqv-AR9XAK8g-p8_UXNA37YhQgv1t9L6PtQIIQkw9y42JW9lb3qMuyxKq5bASRxeopUzENNJzpOs2NLo5AhCaq214DQaiNT7qDAm8AY-PuW',
      bio: 'Produtor de trap e R&B de São Paulo. Trazendo o calor das ruas para cada beat. Collabs abertas.',
      stats: {
        sold: 1204,
        licenses: 89,
        followers: '15.7k'
      }
    });
  }

  getExploreBeats() {
    return of([
        { id: 1, title: 'Trap Dreams', producer: 'Prod. by DJ Metro', artworkUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVHjFPJxLXhwHhgKG_1D9e4pno66cqUA-J2ywCfs4aw238iWatfenVqL1GjX51PMU7Nb76F-KITGiHahdJpIjtgJdgX8gPCKDpM1RJoAHWdrQQABaefTN_ntUt5J6Ge9rnnH3A4lVJ43TLDmNeViJiiJQlchM9UHadmAK8Si64rLgmActYvLnQ-a2xsbJHDsYd7qfOP_rry02XDy5pUQ-nznBktdPK2DtsbtVUwvaUUXwVmyEisRYwJCG2HcN3zDZ0fu3QdvWxtaDl', licenses: [{type: 'Basic', price: 99, selected: true}, {type: 'Premium', price: 199, selected: false}, {type: 'Pro', price: 299, selected: false}]},
        { id: 2, title: 'Lo-Fi Sunset', producer: 'Prod. by Chill Beats', artworkUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9P7ag169GXdEy69Hl9tdo0ECxnpqxMQNQF_EgMp_5Q2eOcJNp9FHscjusl02juMqYepPxISljmjQ0QPpac3R4weXSI3Bh4LkiJaREz8dUVB1_8JXz1dwI7qIBko4xjgnO4p_hBg1wQDT5fcXneAHaJyeSSgV_LT4t5Im97GIghIgDgbCe7wf8v5_rXMRvJdJFabtnU9ujO-eE92p65cDBwSgFWf1vkQQWTtKcSyvH-iL2fiUPzBGruPG7QAabv-TaEnkWV1Y9p8hD', licenses: [{type: 'Basic', price: 79, selected: true}, {type: 'Premium', price: 149, selected: false}, {type: 'Pro', price: 249, selected: false}]},
        { id: 3, title: 'Vibes de Verão', producer: 'Prod. by Sol Beats', artworkUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5mhyPkq6K30xutsiblY1yilKlHlKH3tRRgyk6C48W7rMThiI5fzUxF4rCh_JMxXTyBygflGKPxX7bmvrCZz9QYdCrksfpvrJhXWyDJw2xCEOVWbq472LcxgDaxi6KSj5gQ371Nv3Z7bo51rAUzpDIpPKh0iUpZPRncmiQZmzCq9iQ-T9Wb7lDhyht9jLO-FRTMEL04TSjMlaEkdaFUQP7BRG74hMc63gVgfTVHQ_R4e6pAYVWoiabOqwNkAzKpXuafwqU0_au5YGr', licenses: [{type: 'Basic', price: 129, selected: true}, {type: 'Premium', price: 229, selected: false}, {type: 'Pro', price: 349, selected: false}]}
    ]);
  }

  getBeatmakerDashboard() {
    return of({
        stats: {
            totalSales: { value: 'R$ 7.850', trend: '+12.5%' },
            streams: { value: '120.3k', trend: '+8.2%' },
            profileViews: { value: '4.2k', trend: '+5.1%' }
        },
        topBeats: [
            { id: 1, title: 'Nebula Drift', metric: 'R$ 1.250 em vendas', icon: 'military_tech', artworkUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCB9lkbQufDAZlvhQmOvQOoQjrTEDowbAkd_2Lei3wKDwcHg8hxxos7AwHQ1_yeFV_ueUsZEFYPOCFA8-IhAzyh7x5i7RwVJa9ltY97hYU_sr0ZCyCNx9whZ-Md7LiMQ9kPj1ZaFfny1yPzxsHfDjqMf0nuw7Urcj1fSitPZQizELu5TDOVKFiUkSALoFUvYbb1P95fQqTaL9YF56C3_JwfDofm5xK2YGbATVS7a6caFgNKcgNpfXnDxNlCs9EE04QAlcfs7BqNFXSK' },
            { id: 2, title: 'Streetlight Echoes', metric: '35.2k plays', icon: 'trending_up', artworkUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8N_8qf3niPZA_Nwu4n7mVzE5mx2eZbCfDqe7nHnXmVzmJVFT6emjhoUMYdSD6pV5QyGp92ibYax188YkHOIsS0BYaxh8kcRw-r5J426lbGhx2gl248Zi4Ua3GBS1tjmzo9bYbK1-wXINVh4BDxSfa2qNEZJpGt7mBsM3vz4gGmkSmp0UhgWQzz-kPJIV5F-cBW7x35DxOJobG45EYj0tBqeHPyeKimQFaNwfjgUUd1p5D5RbBq3UvIBZIRav-FAnlu_Cf0LMgwoWB' },
            { id: 3, title: 'Vinyl Dreams', metric: '18.9k plays', icon: 'trending_up', artworkUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjVP1ozLGKvlyztBWqeqjrDk7k67Yb9HYvxXNOoKLW_lOZ3WNTG-a4KeazwA4oWTP9feQ7CIeSGsGZz6YS1Qa9HFSp8X9IgQYvTOqBD22k56Gmyvax7Yty2q4U7sp6Tf37VNtD34kuydYObz5VdERk2AVd2pRHCZyneNU77YMD_vYqeGXvhxtjhvViKkzuMp7r-umwzXqe8RhTN1-hrCfeiL4M7Bptm_SkWi7zYNct__4DPH4NEOdVZVwepIBiSg3RrfOfaWF4VP8t' }
        ],
        performanceChartUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGgfr49oFfKmiMXx3HgR7JxzG5efwgLeXRWId-Qas8NZLHaiMZFEc0HCI_oGuhBf9QwMewoM6TgobghMwNarval4y68NnL6mTrVbcC4XK65BfQ5tIYmj-cboEmo9bCB37PEUn8X8AgNPnCAA1e4wDopSpX-OIRwo864XZP_KnOia-a1BjjygxfW0obfsk1F0_JzCX48kVVRaQtA29YnhJtEanuUTldA_g9X9JAlY0xuNomlBxb06GjLlo5NVu6mUV5NlbKcI0L-hZV'
    });
  }
  
  getBeatForEdit(id: number) {
    return of({
        id: id,
        title: 'Cosmic Drift',
        genre: 'Lo-fi',
        tags: ['Chill', 'Study', 'Lofi'],
        description: 'A chill, atmospheric beat perfect for late-night study sessions or relaxing.',
        artworkUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOIOnE6LU7xUrNUlBlGUPpeKbvenokEK_44mluSY1FgNtHSjYG4ircZq71ZllCjfSLk5QdzYokoL41nzESwyVg2l-AxPoWtHL6UegWbikMpQUTbK3FG21NMDRLO6XoAnsL3dDInncY5wuH_wU3iQztLwNPgolYRdj_4yjcEdZuiemuuh4LG9kV0FIthS3z7ymVLzhjPpz0l8TxOX2jjV4LQYKTZn-WlHjJcNgLlnIbQemBO2dY0hrSISqZM19k9WZ1blGeia_2QD9E',
        files: [
            { name: 'beat_final.mp3', type: 'audio_file' },
            { name: 'beat_final.wav', type: 'audio_file' },
            { name: 'stems.zip', type: 'folder_zip' }
        ],
        licenses: [
            { name: 'Basic', active: true, price: 29.90, files: ['beat_final.mp3'] },
            { name: 'Premium', active: true, price: 79.90, files: ['beat_final.mp3', 'beat_final.wav'] },
            { name: 'Pro', active: false, price: 149.90, files: ['beat_final.mp3', 'beat_final.wav', 'stems.zip'] }
        ]
    });
  }

  getMyBeats() {
    return of([
        { id: 1, title: 'Trap Loko', sales: 124, views: '2.3k', status: 'Ativo', artworkUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxKYcGFeX9lCBnk8k9hqlwG7g4IseEtvnOZA-ulX7m4AxsIAy4pIu4Qo8Y3CMY3EGAM2-taTtnSSxDuJxSm6EeeeguV8lgXHN7-uMwvDCWbluKsM3iKoOtEUiS-kmfdWRPFeGSkLPn86VUNEIV2KotJlZhiewRC0JjgsOwG2rBy9jk3lr4akAHTz5tAREIJOc5YDs2f3YXU4icA6_w6_2iYzQtdeFwdK6nSXuytiPW8z2nmnBdf1_KYsTUdI41JxoVvDnWIfpz3fKr' },
        { id: 2, title: 'Drill Pesado', sales: 56, views: '1.1k', status: 'Inativo', artworkUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeMj1ufca8n7lBgsOJjqvNbY1nLegchER6D8SPUKtyA46LeAlqyib-sHYCZuH4tjVmMVym1SN6OwCLXmvElpq6s8M992MgioBvxSvxp-oC4sXl9Pecqwd4SeXN11deLKKPTbF3PvjgFl9ER269RJ9ITcMbKi8Uh6rtgHHsLjFyIuS52t6BYOO3K2Z8yn9PiR2-NWsenAzjwDoAs2aCUUK2KTDhIMkrMc1QMtg325h41tbONCyP2cWO-20uD_IJMcDvmGW9RfxcPRmV' },
        { id: 3, title: 'Boombap Clássico', sales: 203, views: '5.8k', status: 'Ativo', artworkUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzWvYhA_Sa92bzbnMi16x4WV5mbXk93V0sYJIVjxIYdUpchWLvLnBgqYONIb8WOzj3mWdzJjppMrf41Sz1W3rhU7M6oRtL-_Ju8NMM4pLx09iVAqT9ovzGLnieueeg9cbD015oZGR6t_bheYf1ffBSRwBg07Kcn532h_2LyOpZZOU619-FdmO_5RCyLpxGAgnFhZZ2Ffa4O_nl4hneiXT2NymtHjwIyPW6FpgzSxJIEC559NVT2r9gOOFCGOYpnctfp5eqCJ_USLIP' },
        { id: 4, title: 'R&B Vibe', sales: 89, views: '3.2k', status: 'Ativo', artworkUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbmhHT9DABrGl1en2ZaTpuSvKqZ1igRy_VVCpH5et2BIRcGYxvCXnebkUWKrinQ7eCq_byjtTQRuaLRHP1hPhvq8pwgbsuoC6BJDLrkvCbnly4fIfDGhaod7rmXmLO_Z0_CYsYDv77g3AcY8LOqJulmpdJ9p-OUNnBjseoAtDmknpQjcajnB1jROrYlGCQJfssuaboEX8HZBL-SXuQXr5-ozZT0j44Ev3pltlYJsKJjH4sOnQ2JWh7Sz5-BxRCxvZbpX8JLm6D6y5l' }
    ]);
  }
}
