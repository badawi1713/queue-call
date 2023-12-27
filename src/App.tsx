import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "./components/ui/button";

import * as z from "zod";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { alphabets, convertNumberToAudioFiles } from "./lib/utils";

const formSchema = z.object({
  counter: z.string().min(1, "Diharuskan untuk memilih nomor counter"),
  queue: z
    .string()
    .min(1, "Diharuskan untuk mengisi nomor antrian")
    .max(3, "Maksimal 3 digit angka"),
  queueType: z
    .string()
    .min(1, "Diharuskan untuk memilih")
    .max(1, "Maksimal 1 huruf karakter A-Z"),
});

interface Sequence {
  tipe: string;
  nomor: number;
  ruangan: number;
}

const App: React.FC = () => {
  const audioElementRef = useRef<HTMLAudioElement>(null);
  // const isMounted = useRef(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [allowSound, setAllowSound] = useState(false);

  const formMethods = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      queue: '1',
      queueType: "A",
      counter: '1',
    },
  });

  const playAudioSequence = useCallback(async (sequence: Sequence) => {
    if (audioElementRef.current) {
      const queueNumber = await convertNumberToAudioFiles(sequence.nomor);
      const roomNumber = await convertNumberToAudioFiles(sequence.ruangan);

      const audioFiles: string[] = [
        "in.wav",
        "antrian.wav",
        `${sequence.tipe.toLowerCase()}.wav`,
        ...queueNumber,
        "counter.wav",
        ...roomNumber,
      ];

      const audioElement = audioElementRef.current;
      setIsPlaying(true);

      const playNext = async (index: number) => {
        if (index < audioFiles.length) {
          audioElement.src = `./assets/audio/${audioFiles[index]}`;
          let duration = 0;
          try {
            await audioElement.play();
            duration = await audioElement.duration;
          } catch (error) {
            console.error("Error during audio playback:", error);
          } finally {
            console.log(duration);
            await setTimeout(() => {
              playNext(index + 1);
            }, duration * 1000 + 150);
          }
        } else {
          setIsPlaying(false);
        }
      };

      playNext(0);
    }
  }, []);

  // const initiateAllowAudio = useCallback(async () => {
  //   const currentAudio: Sequence = {
  //     tipe: "u",
  //     nomor: 41,
  //     ruangan: 1,
  //   };
  //   const timeout = setTimeout(() => {
  //     if (audioElementRef.current) {
  //       playAudioSequence(currentAudio);
  //     }
  //   }, 0);
  //   return () => clearTimeout(timeout);
  // }, [playAudioSequence]);

  // useEffect(() => {
  //   // for autoplay if user already accessed the DOM
  //   if (isMounted.current && allowSound) {
  //     initiateAllowAudio();
  //     isMounted.current = false;
  //   }
  // }, [allowSound, initiateAllowAudio]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods;

  const onSubmit = handleSubmit((values) => {
    const { queue, queueType, counter } = values;

    const currentAudio: Sequence = {
      tipe: queueType,
      nomor: +queue,
      ruangan: +counter,
    };
    if (currentAudio) {
      playAudioSequence(currentAudio);
    }
  });

  return (
    <div className="flex flex-col justify-center min-h-screen h-full w-full bg-secondary">
      {allowSound ? (
        <>
          <audio id="audio" ref={audioElementRef} />
          {isPlaying && (
            <div className="mx-auto flex items-center flex-col gap-3">
              <div className="animate-spin w-6 h-6">
                <img
                  src="./assets/images/pokeball.png"
                  className="w-6 h-6 aspect-square"
                />
              </div>
              <p className="text-center">Memanggil Antrian...</p>
            </div>
          )}
          {!isPlaying && (
            <form onSubmit={onSubmit} className="container w-full max-w-sm">
              <div className="flex flex-col gap-6 w-full mb-8">
                <Controller
                  name="queueType"
                  control={control}
                  render={({ field: { onChange, value, ...field } }) => {
                    return (
                      <div className="flex flex-col w-full gap-2">
                        <Label htmlFor="queueType">Jenis Antrian</Label>
                        <Select
                          {...field}
                          onValueChange={onChange}
                          defaultValue={value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis antrian" />
                          </SelectTrigger>
                          <SelectContent>
                            {alphabets.map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {errors?.queueType?.message && (
                          <p className="text-red-600 font-semibold text-sm">{`${errors?.queueType?.message}`}</p>
                        )}
                      </div>
                    );
                  }}
                />
                <Controller
                  name="queue"
                  control={control}
                  render={({ field: { onChange, value, ...field } }) => {
                    return (
                      <div className="flex flex-col w-full gap-2">
                        <Label htmlFor="queue">Nomor Antrian</Label>
                        <Input
                          {...field}
                          type="number"
                          id="queue"
                          placeholder="Masukkan no antrian"
                          onChange={(e) => onChange(e.target.value)}
                          value={value}
                        />
                        {errors?.queue?.message && (
                          <p className="text-red-600 font-semibold text-sm">{`${errors?.queue?.message}`}</p>
                        )}
                      </div>
                    );
                  }}
                />
                <Controller
                  name="counter"
                  control={control}
                  render={({ field: { onChange, value, ...field } }) => {
                    return (
                      <div className="flex flex-col w-full gap-2">
                        <Label htmlFor="counter">Pilih Counter</Label>
                        <Select
                          {...field}
                          onValueChange={onChange}
                          defaultValue={`${value}`}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih counter" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3].map((item) => (
                              <SelectItem key={item} value={`${item}`}>
                                Counter {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {errors?.counter?.message && (
                          <p className="text-red-600 font-semibold text-sm">{`${errors?.counter?.message}`}</p>
                        )}
                      </div>
                    );
                  }}
                />
              </div>
              <Button type="submit">Panggil Antrian</Button>
            </form>
          )}
        </>
      ) : (
        <>
          <Button
            className="w-52 mx-auto"
            disabled={isPlaying}
            onClick={() => setAllowSound(true)}
          >
            Izinkan Panggilan Suara
          </Button>
        </>
      )}
    </div>
  );
};

export default App;
