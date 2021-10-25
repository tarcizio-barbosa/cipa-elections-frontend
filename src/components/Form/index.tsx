import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RadioGroup } from "@headlessui/react";
import { api } from "../../services/api";

type Candidate = {
  id: string;
  candidateFirstName: string;
  candidateLastName: string;
  candidateNumber: string;
  candidatePictureURL: string;
  candidateTeam: string;
};

type Voter = {
  voterCpf: string;
  voterBirthDay: string;
  candidateId: string;
};

export function Form() {
  const [cpf, setCpf] = useState("");
  const [birthday, setBirthday] = useState("");
  const [candidate, setCandidate] = useState("");
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [statusCode, setStatusCode] = useState(0);

  async function handleVote(event: FormEvent) {
    event.preventDefault();

    await api
      .post<Voter>("/voters", {
        voterCpf: cpf,
        voterBirthDay: birthday,
        candidateId: candidate,
      })
      .then((response) => {
        setStatusCode(response.status);
      }).catch(() => {
				setStatusCode(401)
			})

    setCpf("");
    setBirthday("");
    setCandidate("");
  }

  useEffect(() => {
    api.get<Candidate[]>("candidates").then((response) => {
      setCandidates(response.data);
    });
  }, []);

  return (
    <div className="h-96 pt-24 flex flex-col items-center">
      <h1 className="mb-20 font-opens text-3xl">Preencha os dados abaixo</h1>
      <form onSubmit={handleVote}>
        <input
          className="w-48 h-8 mb-20 mr-5 placeholder-gray-300 font-opens text-sm font-bold border-b-2 focus:border-blue-500 focus:outline-none"
          onChange={(event) => setCpf(event.target.value)}
          value={cpf}
          type="text"
          name="voterData"
          id="cpfNumber"
          placeholder="CPF"
        />
        <input
          className="w-48 h-8 mb-20 placeholder-gray-300 font-opens text-sm font-bold border-b-2 focus:border-blue-500 focus:outline-none"
          onChange={(event) => setBirthday(event.target.value)}
          value={birthday}
          type="text"
          name="voterData"
          id="birthDay"
          placeholder="DATA DE NASCIMENTO"
        />

        <RadioGroup value={candidate} onChange={setCandidate} className="flex">
          {candidates.map((element) => (
            <RadioGroup.Option key={element.id} value={element.id}>
              {({ checked }) => (
                <div
                  className={
                    checked
                      ? "w-48 h-48 mr-8 flex flex-col items-center border-2 rounded border-green-500"
                      : "w-48 h-48 mr-8 flex flex-col items-center border-2 rounded border-gray-300"
                  }
                >
                  <div className="mt-3">
                    <Image
                      src={element.candidatePictureURL}
                      alt={element.candidateFirstName}
                      width={80}
                      height={80}
                      className={
                        checked
                          ? "rounded-full"
                          : "rounded-full filter grayscale"
                      }
                    />
                  </div>
                  <span
                    className={
                      checked
                        ? "py-1 font-opens font-bold text-green-600"
                        : "py-1 font-opens font-bold text-gray-300"
                    }
                  >
                    {element.candidateNumber}
                  </span>
                  <p
                    className={
                      checked
                        ? "font-opens text-lg"
                        : "font-opens text-lg text-gray-300"
                    }
                  >
                    {`${element.candidateFirstName} ${element.candidateLastName}`}
                  </p>
                  <strong className={checked ? "" : "text-gray-300"}>
                    {element.candidateTeam}
                  </strong>
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </RadioGroup>

        <button
          type="submit"
          className="w-36 h-12 mt-24 bg-green-700 font-opens font-bold text-sm text-white hover:bg-green-500"
        >
          ENVIAR
        </button>
				{statusCode === 401 &&
					<p className='mt-5 font-open font-bold text-sm text-red-500'>
						ATENÇÃO: O colaborador atrelado à este número de CPF já votou!
					</p>
				}
      </form>
    </div>
  );
}
